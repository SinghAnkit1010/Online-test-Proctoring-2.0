import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginController, registerController, authController } from "../controllers/userCtrl.js"

//router object
const userRouter = express.Router()



//LOGIN || POST
userRouter.post('/login', loginController)

//REGISTER || POST
userRouter.post('/register', registerController)

//Authorization || POST
userRouter.post('/getUserData', authMiddleware, authController)




export default userRouter;