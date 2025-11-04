import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";

export const login = async(req, res, next) => {
    const {email, password, username} = req.body;

    const user = await User.findOne({
        $or: [
            { email: email || username },
            { username: email || username }
        ]
    }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isMatched = await user.comparePassword(password)

    if(!isMatched) {
        return next(new ErrorHandler("Incorrect Password", 400))
    }

    res.status(200).json({
        success: true,
        message: `Hey ${user.name}`
    })

    

};

export const signUp = async(req, res, next) => {

    const {name, email, password, username} = req.body;

    await User.create({name, email, password, username});

    res.status(201).json({
        success: true,
        message: "Registered Successfully!"
    })
};