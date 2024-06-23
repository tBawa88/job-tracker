import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
import { hashPassword, verifyPassword } from '../utils/passwordUtil.js';
import { AuthError } from '../utils/errorClasses.js';
import { generateToken } from '../utils/tokenUtils.js';

import 'express-async-errors'
const ONE_DAY = 24 * 60 * 60 * 1000;

//sending jwt inside the http only cookie
export const registerUser = async (req, res, next) => {
    const isFirstUser = await User.countDocuments() === 0;
    req.body.role = isFirstUser ? 'admin' : 'user';
    req.body.password = await hashPassword(req.body.password)
    const user = new User(req.body)
    await user.save();
    const token = generateToken({ userId: user._id, role: user.role });
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(StatusCodes.CREATED).json({ success: true, message: 'Successfully created a new User', })
}


export const loginUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    const isValidUser = user && (await verifyPassword(req.body.password, user.password))
    if (!isValidUser)
        throw new AuthError('Invalid email or password')
    const token = generateToken({ userId: user._id, role: user.role });
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(StatusCodes.OK).json({ success: true, message: 'User logged in successfully', username: user.name })
}


//simply clear the token from cookie
export const logoutUser = async (req, res, next) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}

export const currentStatus = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(StatusCodes.OK).json({ authenticated: false })
    res.status(StatusCodes.OK).json({ authenticated: true })
}