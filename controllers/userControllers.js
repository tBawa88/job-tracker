import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import Job from "../models/Job.js"
import 'express-async-errors'
import { v2 as cloudinary } from 'cloudinary'
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    const userWithoutPass = user.toJSON();
    res.status(StatusCodes.OK).json({ success: true, user: userWithoutPass })
}


//after uploading the file, delete the image from disk storage
//also delete the old image stored at cloudinary as well since it has no use anymore 
export const updateUser = async (req, res, next) => {
    const newUser = { ...req.body };
    if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = uploadResult.secure_url;
        newUser.avatarPublicId = uploadResult.public_id
    }

    const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && oldUser.avatarPublicId) {   //checking if user had previous avatar/avatarPublicId 
        await cloudinary.uploader.destroy(oldUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ success: true, message: 'Updated user info' })
}


export const getApplicationStats = async (req, res, next) => {
    const userCount = await User.countDocuments();
    const jobCount = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ success: true, userCount, jobCount })
}