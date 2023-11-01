import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {loginController, registerController, authController} from "../controllers/userCtrl.js"

//router object
const studentRouter = express.Router()



//LOGIN || POST
studentRouter.post('/login', loginController)

//REGISTER || POST
studentRouter.post('/register', registerController)

//Authorization || POST
studentRouter.post('/getStudentsData', authMiddleware, authController)




export default studentRouter;