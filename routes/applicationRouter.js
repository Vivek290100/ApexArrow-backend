import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyForJob, getAppliedjobs, getJobApplicants, updateStatus } from '../controllers/applicationController.js';

const router = express.Router();


router.post('/applyForJob/:id',isAuthenticated,applyForJob)
router.get('/getAppliedjobs',isAuthenticated,getAppliedjobs)
router.get('/:id/getJobApplicants',isAuthenticated,getJobApplicants)
router.put('/updateStatus',isAuthenticated,updateStatus)

export default router