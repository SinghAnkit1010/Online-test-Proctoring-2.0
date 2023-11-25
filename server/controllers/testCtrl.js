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

const submitTestController = async (req, res) => {
    try {
        const userId= req.body.userId;
        const testId = req.body.testId;
        const answers = req.body.answers;
        const activities = req.body.activities;
        const user = await userModel.findById(userId);
        const test= await testModel.findById(testId);
        let score=0;
        const questionSet = test.questionSet;
        for(let i=0;i<answers.length;i++){
            if(answers[i]==null || answers[i]==undefined){
                continue;
            }
            if(answers[i].index-1==questionSet[i].correctAnswer){
                score++;
            }
        }
        // console.log(score);
        // console.log(activities);
        user.testsJoined.push({
            testId: testId,
            score: score,
            totalScore: questionSet.length,
            activities: activities
        });
        await user.save();
        test.studentsJoined.push({
            userId: userId,
            score: score,
            totalScore: questionSet.length,
            activities: activities
        });
        await test.save();
        res.status(200).send({ message: 'Test Submitted Successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in submitTestController: ${error.message}`, success: false });
    }
}

// Import statements...

const getResultsController = async (req, res) => {
    try {
      const testId = req.query.testId; // Access the testId from query parameters
      const userId = req.body.userId; 
  
      const user = await userModel.findById(userId);
      
      const testResult = user.testsJoined.find(test => test.testId === testId);
  
      if (testResult) {
        res.status(200).send({ message: 'Test Results fetched successfully', success: true, test: testResult });
      } else {
        res.status(404).send({ message: 'Test not found', success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in getResultsController: ${error.message}`, success: false });
    }
  };
  
  

export { createTestController , getTestDetailsController, submitTestController, getResultsController};
