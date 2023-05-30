import express from "express";

//CONTROLLER
import { createPost, deletePost, getDetail, getPosts, getUpdate } from "../controller/post.js";

const router = express.Router();

router.get("/getPosts", getPosts)
router.post("/createPost", createPost)
router.get("/postDetail/:id", getDetail)
router.patch("/updatePost", getUpdate)
router.delete("/deletePost", deletePost)


export default router;