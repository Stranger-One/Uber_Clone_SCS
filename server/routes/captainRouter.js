import express from 'express';
import Captain from '../models/captainModel.js';
import { body } from 'express-validator';
import captainController from '../controllers/captainController.js';
import authMiddlewar from '../middlewares/authMiddlewar.js';
captainController


const router = express.Router();

router.post('/register', [
    body('firstname').isString().isLength({ min: 3 }).withMessage('Express-Validator::First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Express-Validator::Invalid email address'),
    body('password').isString().isLength({ min: 6 }).withMessage('Express-Validator::Password must be at least 6 characters long'),
    body('vehicle.type').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Express-Validator::Invalid vehicle type'),
    body('vehicle.color').isString().isLength({ min: 3 }).withMessage('Express-Validator::Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isString().isLength({ min: 4 }).withMessage('Express-Validator::Vehicle plate must be at least 4 characters long'),
    body('vehicle.capacity').isNumeric().isInt({ min: 1 }).withMessage('Express-Validator::Vehicle capacity must be at least 1'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
], captainController.loginCaptain);

router.get('/profile', authMiddlewar.authCaptain, captainController.getProfile);
router.get('/logout', authMiddlewar.authCaptain, captainController.logoutCaptain);


export default router;