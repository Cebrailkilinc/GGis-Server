import Auth from "../model/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password, date } = req.body;

    //First of all, we need to patch the email control.
    const user = await Auth.findOne({ email });    
    if (user) {
      return res.status(500).json({ message: "Bu email hesabı zaten mevcut." });
    }

    // Password length controll
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Parolanız en az 6 karakter olmalı..." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email, 
      password: passwordHash,
    });

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// LOGIN 
const login = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await Auth.findOne({ email:email });

    if (!user) {
      return res 
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı." });
    }

    const comparePasswords = await bcrypt.compare(password, user.password);

    if (!comparePasswords) {
      return res
        .status(500)
        .json({ message: "Parolanız veya emailiniz hatalı." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      user,
      token,     
    });   
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {login, register}
