import { User } from "../models/user.js";

export const login = async(req, res, nex) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    const isMatched = await user.comparePassword(password)

    if(!isMatched) {
        return res.status(400).json({success: false, message: "Incorrect Password"});
    }

    res.status(200).json({
        success: true,
        message: `Hey ${user.name}`
    })
    
};

export const signUp = async(req, res, nex) => {

    const {name, email, password, username} = req.body;

    await User.create({name, email, password, username});

    res.status(201).json({
        success: true,
        message: "Registered Successfully!"
    })
};