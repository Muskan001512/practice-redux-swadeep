import mongoose from "mongoose";
const { Schema, model } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        // unique: true,
        type: String,
        required: true,
    }
});

const Users = model("Users", userSchema);

export default Users;
