import mongoose, { Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";


const jobSchema = new Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS), //returns an array of values, which is what 'enum' needs
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
    },
    location: {
        type: String,
    },

}, { timestamps: true })

export default mongoose.model('Job', jobSchema);