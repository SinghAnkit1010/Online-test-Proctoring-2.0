import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: [true, "name is required"]
    },
    institutionID:{
        type: ObjectId,
    },
    questionSet:{
        type: Array, // array of obejcts of questions, options and answers 
        default: []
    },
    isActive:{
        type: Boolean,
        default: false
    },
    studentsJoined:{
        type: Array, // array of student IDs and their scores
        default: []
    },
    startDate:{
        type: Date,
        default: Date.now
    },
    startTime:{
        type: Date,
        default: Date.now
    },
    duration:{
        type: Number,
        default: 0
    },
});

const testModel = mongoose.model('test', testSchema);

export default testModel;