import userModel from '../models/userModel.js';
import testModel from '../models/testModel.js';

const createTestController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        }

        const startTime = new Date(req.body.startDate + 'T' + req.body.startTime);
        const newTest = new testModel({
            testName: req.body.testName,
            institutionID: user._id,
            questionSet: req.body.questionSet,
            studentsJoined: [],
            startDate: req.body.startDate,
            startTime: startTime,
            duration: req.body.duration
        });

        await newTest.save();

        user.testsCreated.push(newTest._id);
        await user.save(); 

        res.status(201).send({ message: 'Test Created Successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in createTestController: ${error.message}`, success: false });
    }
};

const getTestDetailsController = async (req, res) => {
    try {
        const { testId } = req.params;
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        }
        const test = await testModel.findById(testId);
        if (!test) {
            return res.status(404).send({ message: 'Test not found', success: false });
        }
        res.status(200).send({ message: 'Test Details fetched successfully', success: true, test });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in startTestController: ${error.message}`, success: false });
    }
}

export { createTestController , getTestDetailsController};
