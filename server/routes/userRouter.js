import express from 'express';
import userController from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Express-Validator::Invalid Email'),
    body('firstname').isLength({ min: 3 }).withMessage('Express-Validator::First name must be at least 3 characters long'),
    body('lastname').isLength({ min: 3 }).withMessage('Express-Validator::Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Express-Validator::Password must be at least 6 characters long')
], userController.registerUser);

export default router;
