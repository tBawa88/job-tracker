import { Router } from "express";
const router = Router();
import validateJob from "../middleware/validateJob.js";
import validateIdAndOwner from "../middleware/validateJobId.js";
import checkUserLoggedIn from "../middleware/checkAuth.js";
import checkDemoUser from "../middleware/checkDemoUser.js";
import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deletejob,
    getStats
} from '../controllers/jobController.js'


//All routes will require auth 
//every route handler here, will have access to req.user = {userId, role}
router.use(checkUserLoggedIn);

router.route('/')
    .get(getAllJobs)
    .post(checkDemoUser, validateJob, createJob)

router.get('/get-stats', getStats);

router.route('/:id')
    .get(validateIdAndOwner, getJob)
    .patch(checkDemoUser, validateIdAndOwner, validateJob, editJob)
    .delete(checkDemoUser, validateIdAndOwner, deletejob)



export default router