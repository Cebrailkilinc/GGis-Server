import express from "express";

//CONTROLLER
import { readFile } from "../controller/gis.js";

export const router = express.Router();

//Get Method
router.get("/test2", readFile)

 
export default router;
 
