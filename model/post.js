import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({
  
  id: {
    type: String,
    
  }, //Buraya mongo db den gelen id

  name: {
    type: String,
    required: true,
    trim: true,     
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const collection = mongoose.model("post", postSchema);

export default collection;