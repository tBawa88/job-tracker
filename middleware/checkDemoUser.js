//Checking if the current user is the demo user account or no
//This MW will be placed after 'checkAuth' MW and in front of all WRITE functionality MW(in jobs and user)

import { UnauthorizedError } from "../utils/errorClasses.js";
// import 'express-async-errors'
const checkDemoUser = (req, res, next) => {
    if (req.user.isTestUser)
        throw new UnauthorizedError('Demo account, can only read')
    else
        next();
}

export default checkDemoUser;