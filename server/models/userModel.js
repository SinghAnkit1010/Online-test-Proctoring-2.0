import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    registrationNumber: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    isInstitution:{
        type: Boolean,
        default: false
    },
    testsCreated:{
        type: Array,
        default: []
    },
    testsJoined:{
        type: Array,
        default: []
    },
});

const userModel = mongoose.model('user', userSchema);

export default userModel;