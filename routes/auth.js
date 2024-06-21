import { Router } from "express";
import validateRegisterInfo from "../middleware/validateRegister.js";
import validateLoginInfo from "../middleware/validateLogin.js";
import isEmailUnique from "../middleware/isEmailUnique.js";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import 'express-async-errors'

const router = Router();


router.post('/register', validateRegisterInfo, isEmailUnique, registerUser)
router.post('/login', validateLoginInfo, loginUser)
router.post('/logout', logoutUser)



export default router;