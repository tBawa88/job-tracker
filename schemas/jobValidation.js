import { z } from 'zod'

const jobValidationSchema = z.object({
    company: z.string()
        .min(1, 'company name must be alteast 1 char')
        .max(20, 'company name cannot be more than 20 char'),
    position: z.string()
        .min(3, 'Position must be alteast 3 chars')
        .max(20, 'Position cannot exceed 20 chars'),
    location: z.string()
        .min(3, 'location must be atleast 3 chars')
        .max(20, 'location cannot be more than 20 chars')
        .default('My City'),
    jobType: z.enum(['full-time', 'part-time', 'internship'])
        .default('full-time'),
    jobStatus: z.enum(['pending', 'interview', 'declined'])
        .default('pending'),
})
export default jobValidationSchema;