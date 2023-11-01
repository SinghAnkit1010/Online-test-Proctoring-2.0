import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {loginController, registerController, authController} from "../controllers/userCtrl.js"

//rputer object
const router = express.Router()


//LOGIN || POST
router.post('/login', loginController)

//REGISTER || POST
router.post('/register', registerController)

//Authorization || POST
router.post('/getUserData', authMiddleware, authController)




export default router;