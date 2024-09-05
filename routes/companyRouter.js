import express from 'express';
import {registerCompany, getCompany, getCompanyById,updateCompany} from '../controllers/companyController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();


router.post("/register", isAuthenticated,registerCompany);
router.get("/getCompany",isAuthenticated,getCompany);
router.get("/getCompanyById/:id",isAuthenticated,getCompanyById);
router.put("/updateCompany/:id",isAuthenticated,updateCompany);

export default router;