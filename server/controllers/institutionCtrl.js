import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import institutionModel from '../models/institutionModel';

const registerController = async (req, res) => {
    try {
        const existingInstitution = await institutionModel.findOne({ email: req.body.email })
        if (existingInstitution) {
            return res.status(200).send({ message: 'Institution already exists', success: false })
        }
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password !== confirmPassword) {
            return res.status(200).send({ message: 'Confirm Password not matches', success: false })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newInstitution = new institutionModel(
            {
                name: req.body.name,
                email: req.body.email,
                registrationNumber: req.body.registrationNumber,
                password: req.body.password,
            }
        )
        await newInstitution.save()
        res.status(201).send({ message: 'Registered Successfully', success: true });


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
};


const loginController = async (req, res) => {
    try {
        const Institution = await institutionModel.findOne({ email: req.body.email })
        if (!Institution) {
            return res.status(200).send({ message: 'Institution not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, Institution.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: Institution._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Successful', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const Institution = await institutionModel.findById({ _id: req.body.InstitutionId })
        Institution.password = undefined;
        if (!Institution) {
            return res.status(200).send({
                message: "Institution not found", success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: Institution
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