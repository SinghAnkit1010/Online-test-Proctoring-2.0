import userModel from '../models/userModel.js';
import testModel from '../models/testModel.js';

const createTestController = async (req, res) => {
    try {
        const user = userModel.findById({ _id: req.body.userId })
        const newTest = new testModel({
            testName: req.body.testName,
            institutionID: user._id,
            questionSet: req.body.questionSet,
            studentsJoined: [],
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            duration: req.body.duration
        })
        await newTest.save()
        user.testsCreated.push(newTest._id);
        res.status(201).send({ message: 'Test Created Successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
};

export {createTestController}


// testName: {
//     type: String,
//     required: [true, "name is required"]
// },
// institutionID:{
//     type: ObjectId,
// },
// questionSet:{
//     type: Array, // array of obejcts of questions, options and answers 
//     default: []
// },
// isActive:{
//     type: Boolean,
//     default: false
// },
// studentsJoined:{
//     type: Array, // array of student IDs and their scores
//     default: []
// },
// startDate:{
//     type: Date,
//     default: Date.now
// },
// startTime:{
//     type: Date,
//     default: Date.now
// },
// duration:{
//     type: Number,
//     default: 0
// },