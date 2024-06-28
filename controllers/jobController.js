import Job from "../models/Job.js";
import { StatusCodes } from 'http-status-codes'
import mongoose from "mongoose";
import day from 'dayjs';
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

export const getStats = async (req, res, next) => {
    //for a specific user, group by jobStatus and count total rows(documents)
    let stats = await Job.aggregate([
        { $match: { ownerId: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } }
    ])

    //reducing an array of 3 objects into a single object with 3 properties
    stats = stats.reduce((acc, stat) => {
        const { _id, count } = stat;
        acc[_id] = count;
        return acc;
    }, {})
    const totalJobStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    //group by monthly data, looking for count jobs created in last 6 months 
    let monthlyJobStats = await Job.aggregate([
        { $match: { ownerId: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
    ])

    monthlyJobStats = monthlyJobStats.map((item) => {
        const { _id: { year, month }, count } = item
        const date = day().month(month - 1).year(year).format('MMM YY') //obtaining a data string 'Jun 24, May 24'
        //month-1 is done because dayjs months start form 0 
        return { date, count }
    })

    res.status(StatusCodes.OK).json({ totalJobStats, monthlyJobStats })
}

