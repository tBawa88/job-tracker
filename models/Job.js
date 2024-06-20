import mongoose, { Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";


const jobSchema = new Schema({
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS), //returns an array of values, which is what 'enum' needs
        default: JOB_STATUS.PENDING
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME
    },
    location: {
        type: String,
        default: 'My City'
    },

}, { timestamps: true })

export default mongoose.model('Job', jobSchema);