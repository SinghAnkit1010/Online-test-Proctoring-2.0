import express from 'express';

import {loginController, registerController, authController} from "../controllers/institutionCtrl.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const institutionRouter = express.Router();


institutionRouter.post('/login', loginController);

institutionRouter.post('/register', registerController);

institutionRouter.get('/getInstitutionData', authMiddleware, authController);


export default institutionRouter;