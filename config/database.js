import mongoose from "mongoose";
//mongodb://127.0.0.1:27017/authentication mongodb://localhost:27017/
const db = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log("---------  Connect Database  ---------")
}).catch((err)=>{
    console.log(err)
})
}

export default db;