import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {createTestController, getTestDetailsController} from "../controllers/testCtrl.js";

const testRouter = express.Router();

testRouter.post('/create-test', authMiddleware, createTestController);


testRouter.get('/getTestDetails/:testId', authMiddleware, getTestDetailsController);

export default testRouter;