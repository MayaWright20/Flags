import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, sendToken } from "../utils/feature.js";

export const login = asyncError(async(req, res, next) => {
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
        return next(new ErrorHandler("Incorrect Details", 400))
    }

    sendToken(user, res, `Hey ${user.name}`, 200)
});

export const logout = asyncError(async(req, res, next)=> {
    res.status(200).cookie("token","", {
        ...cookieOptions,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged out successfully "
    })
})

export const signUp = asyncError(async(req, res, next) => {

    const {name, email, password, username} = req.body;

    let user = await User.findOne({
        $or: [
            { email: email || username },
            { username: email || username }
        ]
    });

    if(user) return next(new ErrorHandler("User already exists", 400));

    user = await User.create({name, email, password, username});

    sendToken(user, res, "Welcome!", 201)
});

export const getMyProfile = asyncError(async(req, res, next)=> {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})