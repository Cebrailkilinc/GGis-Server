import mongoose from "mongoose";

const Schema = mongoose.Schema;
const authSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            default: new Date(),
        },
    }
);


const collection = mongoose.model("auth", authSchema);

authSchema.set("toJSON", {
    transform: (data, toObj) => {
        toObj.id = toObj._id.toString();
        delete toObj._id;
        delete toObj.__v;
        delete toObj.password;
    },
});

export default collection;
