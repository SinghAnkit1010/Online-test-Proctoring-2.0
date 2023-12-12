import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginController, registerController, authController, getTestsController, getCreatedTestsController, updateUserController } from "../controllers/userCtrl.js"

//router object
const userRouter = express.Router()



//LOGIN || POST
userRouter.post('/login', loginController)

//REGISTER || POST
userRouter.post('/register', registerController)

//Authorization || POST
userRouter.post('/getUserData', authMiddleware, authController)

userRouter.get('/getTests', authMiddleware, getTestsController)

userRouter.get('/getCreatedTests', authMiddleware, getCreatedTestsController)

userRouter.post('/update-user', authMiddleware, updateUserController);





export default userRouter;