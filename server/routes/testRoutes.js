import express from 'express';

const testRouter = express.Router();

testRouter.get('getTestDetails', getTestDetailsController);

export default testRouter;