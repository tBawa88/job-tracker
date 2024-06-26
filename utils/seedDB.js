import * as dotenv from 'dotenv'
import { readFile } from 'fs/promises'
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import User from '../models/User.js'

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_URI)
} catch (error) {
    console.log("Error connecting to db")
    process.exit(1);
}


/**
        * An array containing all Jobs for demo user account
        * @type {[Object]}
        * @property {ObjectId} _id - Mongoose ObjectId.
        * @property {ObjectId} ownerId - Mongoose ObjectId of the Owner.
        * @property {string} company - Name of the company.
        * @property {string} position - Position offered by the company.
        * @property {string} location - Location of the company.
        * @property {'pending' | 'interview' | 'declined'} jobStatus - Status of the current applicatoin.
        * @property {'full-time' | 'part-time' | 'intern'} jobType - Type of the Job offered.
        */
let jobs = [];

const seedDB = async () => {
    try {
        const filePath = new URL('./MOCK_DATA.json', import.meta.url);
        const jobsJSONdata = await readFile(filePath, { encoding: 'utf8' });
        const jobsData = JSON.parse(jobsJSONdata);

        const user = await User.findOne({ email: 'aaa@gmail.com' })
        // const testUser = await User.findOne({ email: 'test@test.com' });

        for (let job of jobsData) {
            jobs.push({ ...job, ownerId: user._id })
        }
        await Job.deleteMany({ ownerId: user._id })
        await Job.create(jobs)
        console.log("Seeding done")
        process.exit(1);
    } catch (error) {
        console.log('Some error occured')
        process.exit(1);
    }
}

seedDB();