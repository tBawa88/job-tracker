import { Router } from "express";
import { getCurrentUser, updateUser, getApplicationStats } from "../controllers/userControllers.js";
import checkAdmin from "../middleware/checkAdmin.js";
import validateUpdateUserInfo from "../middleware/validateUpdateUser.js";
import isUpdatePossible from "../middleware/isUpdatePossible.js";
import checkUserLoggedIn from "../middleware/checkAuth.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();


router.use(checkUserLoggedIn);
//all these routes will have user{userID, role} attaches onto the req object
router.get('/current-user', getCurrentUser)

router.patch('/update-user', upload.single('avatar'), validateUpdateUserInfo, isUpdatePossible, updateUser)

router.get('/admin/app-stats', checkAdmin, getApplicationStats)


export default router;