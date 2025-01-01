import express from 'express';
import Captain from '../models/captainModel.js';
import { body } from 'express-validator';
import captainController from '../controllers/captainController.js';
import authMiddlewar from '../middlewares/authMiddlewar.js';
captainController


const router = express.Router();

router.post('/register', [
    body('firstname').isString().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
    body('vehicle.type').isString().isIn(['car', 'motorcycle', 'auto']),
    body('vehicle.color').isString().isLength({ min: 3 }),
    body('vehicle.plate').isString().isLength({ min: 3 }),
    body('vehicle.capacity').isNumeric().isInt({ min: 1 }),
], captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
], captainController.loginCaptain);

router.get('/profile', authMiddlewar.authCaptain, captainController.getProfile);
router.get('/logout', authMiddlewar.authCaptain, captainController.logoutCaptain);


export default router;