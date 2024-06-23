import { Router } from "express";
import validateRegisterInfo from "../middleware/validateRegister.js";
import validateLoginInfo from "../middleware/validateLogin.js";
import isEmailUnique from "../middleware/isEmailUnique.js";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import validateUsername from "../middleware/validateUsername.js";
import validatePassword from "../middleware/validatePassword.js";
// import 'express-async-errors'

const router = Router();


router.post('/register', validateRegisterInfo, isEmailUnique, registerUser)
router.post('/check-username', validateUsername)
router.post('/check-password', validatePassword)
router.post('/login', validateLoginInfo, loginUser)
router.post('/logout', logoutUser)



export default router;