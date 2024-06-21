import { InvalidInput } from "../utils/errorClasses.js";
import updateUserSchema from "../schemas/updateUserValidation.js";

const validateUpdateUser = (req, res, next) => {
    const result = updateUserSchema.safeParse(req.body);
    try {
        if (!result.success) {
            const errors = result.error.errors.map(err => ({ property: err.path, msg: err.message }))
            console.log(errors)
            throw new InvalidInput('Invalid input for registration', errors)
        }
    } catch (error) {
        return next(error)
    }

    next();
}

export default validateUpdateUser;