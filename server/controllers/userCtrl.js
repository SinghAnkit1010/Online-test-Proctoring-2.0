import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

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


export {loginController, registerController, authController}