//name , lastname, location, email , password

import { z } from 'zod'

const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(3, 'Name must be atleast 3 characters')
        .max(20, 'Name cannot exceed 20 characters')
        .transform((str) => str.toLowerCase()),
    lastName: z.string()
        .trim()
        .min(3, 'Lastname must be atleast 3 characters')
        .max(20, 'Lastname cannot exceed 20 characters')
        .default('lastName')
        .transform((str) => str.toLowerCase()),
    location: z.string()
        .min(1, 'Locatin cannot be empty')
        .max(50, 'Location cannot exceed 50 chars')
        .default('earth')
        .transform((str) => str.toLowerCase()),
    email: z.string()
        .regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, {
            message: 'Invalid email address'
        }),
    password: z.string()
        .min(6, 'Password must be atleast 6 characters'),
    //later add the regex to the password /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
})

export default registerSchema;