import express from 'express';
import {signup, login, getUserData,updateProfile} from '../controller/authController.js';

const router = express.Router();

router.get('/getUserData', getUserData);
router.post('/signup', signup);
router.post('/login',login);
router.put('/updateProfile',updateProfile);

export default router;