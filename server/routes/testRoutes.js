import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {createTestController, getTestDetailsController, submitTestController, getResultsController} from "../controllers/testCtrl.js";

const testRouter = express.Router();

testRouter.post('/create-test', authMiddleware, createTestController);


testRouter.get('/getTestDetails/:testId', authMiddleware, getTestDetailsController);

testRouter.post('/submitTest', authMiddleware, submitTestController);

testRouter.get('/getResults', authMiddleware, getResultsController);


export default testRouter;