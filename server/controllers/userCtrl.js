import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import testModel from '../models/testModel.js';

const registerController = async (req, res) => {
    try {
        const existinguser = await userModel.findOne({ email: req.body.email })
        if (existinguser) {
            return res.status(200).send({ message: 'User already exists', success: false })
        }
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newuser = new userModel(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isInstitution: req.body.isInstitution,
                registrationNumber: req.body.registrationNumber
            }
        )
        await newuser.save()
        res.status(201).send({ message: 'Registered Successfully', success: true });


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
};


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: "User is not registered", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Successful', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found", success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Auth Error',
            success: false,
            error
        })
    }
}


const getTestsController = async (req, res) =>{
    try {
        const user = await userModel.findById({_id: req.body.userId})
        const tests= user.testsJoined;
        for(let i=0;i<tests.length;i++){
            const test = await testModel.findById({_id: tests[i].testId})
            const Institution= await userModel.findById({_id: test.institutionID})

            const date= test.startDate;
            const utcDate = new Date(date);
            const options = { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" };
            const localDateString = utcDate.toLocaleDateString("en-US", options);

            let ActivityScore= 0;
            ActivityScore+= tests[i]?.activities[`number of times head movement occured`];
            ActivityScore+= tests[i]?.activities[`number of times many person detected`];
            ActivityScore+= tests[i]?.activities[`number of times no person detected`];
            ActivityScore+= tests[i]?.activities[`number of times talked`];
            ActivityScore+= tests[i]?.activities[`numbers of time phone detected`];
            ActivityScore+= tests[i].tabCounts;
            
            const testDetails= {
                testName: test.testName,
                testDate: localDateString,
                InstitutionName: Institution.name,
                ActivityScore: ActivityScore
            }
            tests[i].testDetails= testDetails;
        }
        res.status(200).send({
            success: true,
            message: 'Tests fetched successfully',
            tests
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Test fetch error',
            success: false,
            error
        })
    }
}


const getCreatedTestsController= async(req, res)=>{
    try {
        const user= await userModel.findById({_id: req.body.userId})
        const tests= user.testsCreated;

        let createdTests= [];

        for(let i=0;i<tests.length;i++){
            const test = await testModel.findById({_id: tests[i]})

            const date= test?.startDate;
            const utcDate = new Date(date);
            const options = { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" };
            const localDateString = utcDate.toLocaleDateString("en-US", options);


            const time = test?.startTime;
        const utcTime = new Date(time);
        const optionsTime = { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric"};
        const localTimeString = utcTime.toLocaleTimeString("en-US", optionsTime);

            const testDetails= {
                testName: test?.testName,
                startTime: localTimeString,
                testDate: localDateString,
                studentsCount: test?.studentsJoined.length,
                duration: test?.duration,
                testId: test?._id
            }
            createdTests.push(testDetails);
        }
        res.status(200).send({
            success: true,
            message: 'Created Tests fetched successfully',
            createdTests
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Created Test fetch error',
            success: false,
            error
        })
    }
}


const updateUserController = async (req, res) => {
    try {
        const userDetails = req.body;
        const user = await userModel.findById({ _id: req.body.userId  });
     
            if (userDetails.name) {
                user.name = userDetails.name;
            }
            
            if (userDetails.contact) {
                user.contact = userDetails.contact;
            }
            if (userDetails.address) {
                user.address = userDetails.address;
            }
            if(userDetails.age){
                user.age= userDetails.age;
            }
            if(userDetails.sex){
                user.sex= userDetails.sex;
            }

            await user.save();
            res.status(200).send({
                success: true,
                message: 'User updated successfully',
                user
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'User update error',
            success: false,
            error
        })
    }
}


export {loginController, registerController, authController, getTestsController, getCreatedTestsController, updateUserController}