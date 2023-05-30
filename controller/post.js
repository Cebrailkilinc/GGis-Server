import postSchema from "../model/post.js";

const getPosts = async (req, res) => {
  console.log(req.body)
  try {
    const getPosts = await postSchema.find();
    res.status(200).json({
      getPosts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 
const createPost = async (req, res) => {
  console.log(req.body)
  try {
    const newPost = await postSchema.create(req.body);   
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await postSchema.findById(id);
    res.status(200).json({
        detailPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await  postSchema.findByIdAndUpdated(id, req.body, {new: true});
    res.status(200).json({
      updatedPost,
    });
  } catch (error) { 
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postSchema.findByIdAndRemove(id);
    res.status(201).json({
      message:"Silme işlemi başarılı",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {getPosts,createPost, getDetail,getUpdate,deletePost}