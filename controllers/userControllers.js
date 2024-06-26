import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import Job from "../models/Job.js"
import { v2 as cloudinary } from 'cloudinary'
import { formatImage } from "../middleware/multerMiddleware.js"
import 'express-async-errors'

export const getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    const isTestUser = req.user.userId === '667baa650b6089e13405abaa';  //mongo id of the demo acc. user
    const userWithoutPass = user.toJSON();
    res.status(StatusCodes.OK).json({ success: true, user: userWithoutPass, isTestUser })
}


//after uploading the file, delete it from the couldinary account using publicId
export const updateUser = async (req, res, next) => {
    const newUser = { ...req.body };
    if (req.file) {
        const file = formatImage(req.file)
        const uploadResult = await cloudinary.uploader.upload(file);
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