import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import morgan from "morgan";
import shapefile from "shapefile";
import multer from "multer";
import path from "path";
import fs from "fs";
import { clear } from "console";

//ROUTES
import Auth from "./routes/auth.js";
import Post from "./routes/post.js";

import File from "./model/file.js";

const app = express();
//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

const uploads = multer({ dest: "uploads/" });
const __dirname = path.dirname(new URL(import.meta.url).pathname);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "application/octet-stream") {
      callback(null, true);
    } else {
      console.log("only jpg & png file supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

app.get("/test", function routeHandler(req, res) {
  const filePath = "./shapefile/Parsel2D.shp";
  const arr = [];
  shapefile
    .read(filePath)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.status(500).send({ error: err });
    });
});

const dbfFilePath = "./shapefile/bina3d.shx";
const dbfFileData = fs.readFileSync(dbfFilePath);

app.post(
  "/upload",
  upload.single("shapefile"),
  async function (req, res, next) {
    try {
      if (!req.file) {
        return;
      }
      //   const filePath = `./uploads/${req.file.filename}`;
      //   shapefile
      //     .read(filePath)
      //     .then(function (result) {
      //       res.send(result);
      //     })
      //     .catch(function (err) {
      //       res.status(500).send({ error: err });
      //     });
      //
      const file = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
      });

      file.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Dosya kaydedilemedi.");
        } else {
          res.send("Dosya başarıyla kaydedildi.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
);

app.get("/files", (req, res) => {
  File.find({}, async (err, files) => {
    const allData = [];
    if (err) {
      console.error(err);
      res.status(500).send("Dosyalar getirilemedi.");
    } else {
       files.map((item) => {
        shapefile
          .read(`./uploads/${item.filename}`)
          .then(async function (result) {
            allData.push(result);
          })
          .catch(function (err) {
            res.status(500).send({ error: err });
          });
      });
      
    }   
    setTimeout(function() {
      res.status(200).send(allData);
    }, 1000);    
  });
});

//REFISTER
app.use("/", Auth);
app.use("/", Post);

//Connect Database E:\AfrontEndDosyaları\React_Project\toolApp\server\uploads
db();

//SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("---------- Server 5000 portunda çalışıyor ----------");
});
