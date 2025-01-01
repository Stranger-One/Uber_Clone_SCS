import express from 'express';
import userController from '../controllers/userController.js';
import authMiddlewar from '../middlewares/authMiddlewar.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Express-Validator::Invalid Email'),
    body('firstname').isLength({ min: 3 }).withMessage('Express-Validator::First name must be at least 3 characters long'),
    body('lastname').isLength({ min: 3 }).withMessage('Express-Validator::Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Express-Validator::Password must be at least 6 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Express-Validator::Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Express-Validator::Password must be at least 6 characters long')
], userController.loginUser);

router.get('/profile', authMiddlewar.authUser, userController.getUserProfile);
router.get('/logout', authMiddlewar.authUser, userController.logoutUser);

export default router;
