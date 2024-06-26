import { AuthError } from '../utils/errorClasses.js';
import { verifyToken } from '../utils/tokenUtils.js';
import 'express-async-errors'



const checkUserLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new AuthError('User not authenticated')
    }

    try {
        const { userId, role } = verifyToken(token).user
        const isTestUser = userId === '667baa650b6089e13405abaa';
        req.user = { userId, role, isTestUser }
    } catch (error) {
        throw new AuthError("User not authenticated")
    }

    next();
}

export default checkUserLoggedIn;