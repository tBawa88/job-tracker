import Job from "../models/Job.js";
import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'

//not using trycatch, using express-async-error to catch the async errors
//moved the NotFoundError handling logic in 'validateJobId' middleware

export const createJob = async (req, res, next) => {
    const { company, position } = req.body;
    const { userId } = req.user;
    const newJob = new Job({ company, position });
    newJob.ownerId = userId;    //add id of the owner (current user)
    await newJob.save();
    res.status(StatusCodes.CREATED).json({ success: true, message: 'Successfully created new job', job: newJob })
}

export const getAllJobs = async (req, res, next) => {
    const jobs = await Job.find({ ownerId: req.user.userId });
    res.status(StatusCodes.OK).json({ success: true, message: "Successfully fetched all jobs", jobs })
}

export const getJob = async (req, res, next) => {
    const foundJob = await Job.findById(req.params.id);
    return res.status(StatusCodes.OK).json({ success: true, message: "Successfully fetched the job", job: foundJob })
}

export const editJob = async (req, res, next) => {
    const newJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(StatusCodes.OK).json({ success: true, message: 'Successfully updated the job', job: newJob })
}

export const deletejob = async (req, res, next) => {
    const deletedJob = await Job.findByIdAndDelete(req.params.id)
    return res.status(StatusCodes.OK).json({ success: true, message: "Successfully deleted the job", job: deletedJob })

}