import User from "../models/User.js";
import { InvalidInput } from "../utils/errorClasses.js";

//could use import 'express-async-errors' here for consistency
const isEmailUnique = async (req, res, next) => {
    const existingUserWithEmail = await User.findOne({ email: req.body.email })
    try {
        if (existingUserWithEmail)
            throw new InvalidInput('Email already exists')
    } catch (error) {
        return next(error);
    }

    next();
}

export default isEmailUnique;