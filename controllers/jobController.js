import Job from "../models/Job.js";
import { StatusCodes } from 'http-status-codes'
import day from 'dayjs';
import mongoose from "mongoose";
import 'express-async-errors'


export const createJob = async (req, res, next) => {
    const { userId } = req.user;
    const newJob = new Job(req.body);
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

export const showStats = async (req, res, next) => {
    const defaultData = {
        pending: 22,
        interview: 11,
        declined: 8
    }
    const monthlyData = [
        { date: 'May 23', count: 12 },
        { date: 'June 23', count: 20 },
        { date: 'July 23', count: 15 },
    ]
    res.status(StatusCodes.OK).json({ defaultData, monthlyData })
}