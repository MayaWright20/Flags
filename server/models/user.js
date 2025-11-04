import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already taken"],
        validate: validator.isEmail
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
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

schema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

schema.methods.generateToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "90d"
    })
}

export const User = mongoose.model("User", schema);