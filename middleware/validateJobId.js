import idSchema from "../schemas/mongooseIdValidation.js";
import { AuthError, InvalidInput, NotFoundError } from "../utils/errorClasses.js";
import Job from "../models/Job.js";
import 'express-async-errors'

const validateIdAndOwner = async (req, res, next) => {
    //checks if the :id is a valid mongoose id, using zod schema
    const result = idSchema.safeParse(req.params.id);
    if (!result.success) {
        const message = result.error.errors[0].message;
        console.log("Result of id validation ", message)
        throw new InvalidInput(message.toString())
    }

    //checks if the job of that _id exists in the DB
    const job = await Job.findById(req.params.id)
    if (!job)
        throw new NotFoundError('Job with given id does not exist')

    //checks if the current user is the owner of that job
    const isOwner = job.ownerId.toString() === req.user.userId;
    if (!isOwner)
        throw new AuthError('User not authenticated');

    next();
}

export default validateIdAndOwner;