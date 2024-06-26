import { z } from 'zod'
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';



const username = z.string().min(3, 'Username must be more than 2 chars')
    .max(30, 'Username exceeding 30 characters')
    .regex(/^[^\s]+$/, 'Username must not contain spaces')
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, 'Invalid username')

const validateUsername = async (req, res, next) => {
    const { name } = req.body;
    const result = username.safeParse(name);
    if (!result.success) {
        const errorMessage = result.error.errors[0].message;
        return res.status(StatusCodes.IM_A_TEAPOT).json({ message: errorMessage })
    }

    const existingUser = await User.findOne({ name })
    if (existingUser)
        return res.status(StatusCodes.IM_A_TEAPOT).json({ message: "Username already exisits" })

    return res.status(StatusCodes.OK).json({ message: 'Username is valid' })

}


export default validateUsername