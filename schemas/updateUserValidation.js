
import { z } from 'zod'

const updateUserSchema = z.object({
    name: z.string()
        .trim()
        .min(3, 'Name must be atleast 3 characters')
        .max(20, 'Name cannot exceed 20 characters')
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
})

export default updateUserSchema;