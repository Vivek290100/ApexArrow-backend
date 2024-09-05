import express from 'express';

import {login, register, logout, updateProfile} from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.put('/updateProfile', isAuthenticated, updateProfile);
router.get('/logout', logout);



export default router