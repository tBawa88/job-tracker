import { StatusCodes } from 'http-status-codes';
import { z } from 'zod'

const passwordSchema = z.string()
    .min(6, 'Password must be atleast 6 characters')
    .max(20, 'Password length cannot exceed 20')
    .regex(/^[^\s]+$/, 'Password must not contain spaces')
    .regex(/[A-Z]/, 'Password must contain one UpperCase character')
    .regex(/[a-z]/, 'Password must contain one Lowercase character')
    .regex(/\d/, 'Password Must contain one Numeric value');

const validatePassword = async (req, res, next) => {
    const { password } = req.body;
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
        const erorrMessage = result.error.errors[0].message;
        console.log('Error message of pasword ,', erorrMessage)
        return res.status(StatusCodes.IM_A_TEAPOT).json({ message: erorrMessage })
    }

    return res.status(StatusCodes.OK).json({ message: 'Password is valid' })
}

export default validatePassword;
