import { Router } from "express";
import { AuthError } from "../utils/errorClasses.js";
const router = Router();
import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deletejob
} from '../controllers/jobController.js'
//TODO : move code into controllers
router.get('/', getAllJobs)

router.get('/:id', getJob)


///these routes will require auth

router.post('/', createJob)


router.patch('/:id', editJob)

router.delete('/:id', deletejob)

export default router