import mongoose from "mongoose";
import { z } from 'zod'

const idSchema = z.string()
    .refine((str) => mongoose.Types.ObjectId.isValid(str), { message: 'Entered ID is not valid Job id' })

export default idSchema;