import Job from "../models/Job.js";
import { NotFoundError } from "../utils/errorClasses.js";
import { StatusCodes } from 'http-status-codes'


//not using trycatch, using express-async-error to catch the async errors
export const createJob = async (req, res, next) => {
    const { company, position } = req.body;
    const newJob = new Job({ company, position });
    await newJob.save();
    res.status(StatusCodes.CREATED).json({ success: true, message: 'Successfully created new job', job: newJob })
}

export const getAllJobs = async (req, res, next) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ success: true, message: "Successfully fetched all jobs", jobs })
}

export const getJob = async (req, res, next) => {
    const foundJob = await Job.findById(req.params.id);
    if (!foundJob)
        throw new NotFoundError('Job with given id not found')
    else
        return res.status(StatusCodes.OK).json({ success: true, message: "Successfully fetched the job", job: foundJob })
}

export const editJob = async (req, res, next) => {
    const newJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!newJob)
        throw new NotFoundError('Job with given id not found')
    else
        res.status(StatusCodes.OK).json({ success: true, message: 'Successfully updated the job', job: newJob })
}

export const deletejob = async (req, res, next) => {
    const deletedJob = await Job.findByIdAndDelete(req.params.id)
    if (deletedJob)
        return res.status(StatusCodes.OK).json({ success: true, message: "Successfully deleted the job", job: deletedJob })
    else
        throw new NotFoundError('Job with given id not found')
}