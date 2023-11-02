import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import studentModel from '../models/studentModel.js';

const registerController = async (req, res) => {
    try {
        const existingStudent = await studentModel.findOne({ email: req.body.email })
        if (existingStudent) {
            return res.status(200).send({ message: 'Student already exists', success: false })
        }
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newStudent = new studentModel(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
        )
        await newStudent.save()
        res.status(201).send({ message: 'Registered Successfully', success: true });


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
};


const loginController = async (req, res) => {
    try {
        const Student = await studentModel.findOne({ email: req.body.email })
        if (!Student) {
            return res.status(200).send({ message: "Student doesn't registered", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, Student.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: Student._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Successful', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        console.log(req.body);
        const Student = await studentModel.findById({ _id: req.body.userId })
        Student.password = undefined;
        if (!Student) {
            return res.status(200).send({
                message: "Student not found", success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: Student
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


export {loginController, registerController, authController}