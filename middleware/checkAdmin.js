//this route will check if the current logged in user is  admin or not
import { AuthError } from "../utils/errorClasses.js"
import 'express-async-errors'

const checkAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin')
        throw new AuthError('User does not have admin privilages')
    next();
}

export default checkAdmin;