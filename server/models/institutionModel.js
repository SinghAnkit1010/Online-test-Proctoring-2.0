import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    registrationNumber: {
        type: String,
        required: [true, "registration number is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
});

const institutionModel = mongoose.model('institution', institutionSchema);

export default institutionModel;
