import { Router } from "express";
import { getCurrentUser, updateUser, getApplicationStats } from "../controllers/userControllers.js";
import checkAdmin from "../middleware/checkAdmin.js";
import validateUpdateUserInfo from "../middleware/validateUpdateUser.js";
import isUpdatePossible from "../middleware/isUpdatePossible.js";
const router = Router();

//all these routes will have user{userID, role} attaches onto the req object
router.get('/current-user', getCurrentUser)

//need to check if the email of the current logged in user was updated or not
//and if it was, then make sure that it does not already exist
router.get('/update-user', validateUpdateUserInfo, isUpdatePossible, updateUser)

router.get('/admin/app-stats', checkAdmin, getApplicationStats)


export default router;