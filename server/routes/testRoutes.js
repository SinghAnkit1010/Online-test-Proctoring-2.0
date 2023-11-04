import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {createTestController} from "../controllers/testCtrl.js";

const testRouter = express.Router();

testRouter.post('/create-test', authMiddleware, createTestController);

export default testRouter;