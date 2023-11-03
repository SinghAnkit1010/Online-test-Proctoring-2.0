import express from 'express';
import {createTestController, getTestDetailsController} from "../controllers/testCtrl.js";

const testRouter = express.Router();

testRouter.get('getTestDetails', getTestDetailsController);

testRouter.post('/create-test', createTestController);

export default testRouter;