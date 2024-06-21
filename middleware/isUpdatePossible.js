//find the current logged in user from DB
//check if the new email matches the old email
//  if it does, then no problem, call next()
//  else,  check if the current new email already taken or not
//      if it is taken, then throw invalidinput error
//      else all okay, call next

import User from "../models/User.js"
import { InvalidInput, NotFoundError } from "../utils/errorClasses.js";

import 'express-async-errors'


const isUpdatePossible = async (req, res, next) => {
    const { email } = req.body;
    const currentUser = await User.findById(req.user.userId);
    if (!currentUser)
        throw NotFoundError('User not found')

    if (email === currentUser.email) {
        return next();
    }

    const existingUserWithEmail = await User.findOne({ email })
    if (existingUserWithEmail)
        throw new InvalidInput('Email already exists, choose another one')

    return next();
}

export default isUpdatePossible;