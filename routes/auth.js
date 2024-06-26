import { Router } from "express";
import validateRegisterInfo from "../middleware/validateRegister.js";
import validateLoginInfo from "../middleware/validateLogin.js";
import isEmailUnique from "../middleware/isEmailUnique.js";
import { registerUser, loginUser, logoutUser, currentStatus, loginDemoUser } from "../controllers/authController.js";
import validateUsername from "../middleware/validateUsername.js";
import validatePassword from "../middleware/validatePassword.js";
// import 'express-async-errors'

const router = Router();

router.get('/status', currentStatus)
router.post('/register', validateRegisterInfo, isEmailUnique, registerUser)
router.post('/login', validateLoginInfo, loginUser)
router.post('/logout', logoutUser)
router.post('/check-password', validatePassword)
router.post('/check-username', validateUsername)

router.post('/login-demoUser', loginDemoUser)

export default router;