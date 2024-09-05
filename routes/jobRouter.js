import express from 'express';

import {postjob, getAllJobs, getJobById, getAdminJob} from '../controllers/jobController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/postjob',isAuthenticated,postjob)
router.get('/getAllJobs',isAuthenticated,getAllJobs)
router.get('/getJobById/:id',isAuthenticated,getJobById)
router.get('/getAdminJob',isAuthenticated,getAdminJob)


export default router