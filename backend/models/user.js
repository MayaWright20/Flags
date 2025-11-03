import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already taken"],
        validate: validator.isEmail
    },
    username: {
        type: String,
        required: [true, "Please a username"],
        unique: [true, "Username already taken"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        validator: [validator.isStrongPassword, "Too easy! Please enter a stronger password"],
        select: false
    },
    avatar: {
        public_id: String, 
        url: String
    },
    otp: Number,
    otp_expire: Date,
});

export const User = mongoose.model("User", schema);