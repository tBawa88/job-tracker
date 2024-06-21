import jobSchema from '../schemas/jobValidation.js';
import { InvalidInput } from '../utils/errorClasses.js';

const validateJob = (req, res, next) => {
    const result = jobSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(err => ({ property: err.path[0], msg: err.message }))
        console.log("Error data", errors)
        throw new InvalidInput('Input data not valid', errors)
    }
    next()
}
export default validateJob;