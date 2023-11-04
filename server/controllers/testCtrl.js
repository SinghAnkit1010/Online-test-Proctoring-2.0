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

export { createTestController };
