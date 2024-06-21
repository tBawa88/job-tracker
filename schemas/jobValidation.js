import { z } from 'zod'

const jobValidationSchema = z.object({
    company: z.string({ message: 'Company name must be provided' })
        .trim()
        .min(3, 'company name must be alteast 3 char')
        .max(50, 'company name cannot be more than 50 char')
        .transform((str) => str.toLowerCase()),
    position: z.string({ message: 'Position must be provided' })
        .trim()
        .min(3, 'Position must be alteast 3 chars')
        .max(30, 'Position cannot exceed 30 chars')
        .transform((str) => str.toLowerCase()),
    location: z.string()
        .trim()
        .min(3, 'Location must be atleast 3 chars')
        .max(20, 'Location cannot be more than 20 chars')
        .default('My City')
        .transform((str) => str.toLowerCase()),
    jobType: z.enum(['full-time', 'part-time', 'internship'])
        .default('full-time'),
    jobStatus: z.enum(['pending', 'interview', 'declined'])
        .default('pending'),
})
export default jobValidationSchema;