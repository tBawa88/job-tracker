import { StatusCodes } from "http-status-codes"
import 'express-async-errors'
import User from "../models/User.js"
import Job from "../models/Job.js"


export const getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    const userWithoutPass = user.toJSON();
    res.status(StatusCodes.OK).json({ success: true, title: 'Successfully found the current', user: userWithoutPass })
}


export const updateUser = async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.status(StatusCodes.OK).json({ success: true, title: 'Succesfully updated current user', user: updatedUser })
}


export const getApplicationStats = async (req, res, next) => {
    const userCount = await User.countDocuments();
    const jobCount = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ success: true, userCount, jobCount })
}