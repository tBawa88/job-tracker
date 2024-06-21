import { Router } from "express";
const router = Router();
import validateJob from "../middleware/validateJob.js";
import validateIdAndOwner from "../middleware/validateJobId.js";
import checkUserLoggedIn from "../middleware/checkAuth.js";
import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deletejob
} from '../controllers/jobController.js'


//All routes will require auth 
//every route handler here, will have access to req.user = {userId, role}
router.use(checkUserLoggedIn);

router.get('/', getAllJobs)

router.get('/:id', validateIdAndOwner, getJob)



router.post('/', validateJob, createJob)


router.patch('/:id', validateIdAndOwner, validateJob, editJob)

router.delete('/:id', validateIdAndOwner, deletejob)

export default router