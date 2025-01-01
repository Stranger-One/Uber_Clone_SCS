import { validationResult } from "express-validator";
import Captain from "../models/captainModel.js";
import BlacklistToken from "../models/blacklistTokenModel.js";

export default {
    registerCaptain: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { firstname, lastname, email, password, vehicle } = req.body;
            if (!firstname || !lastname || !email || !password || !vehicle) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const captainExists = await Captain.findOne({ email })
            if (captainExists) {
                return res.status(400).json({
                    success: false,
                    message: "Captain already exists"
                });
            }

            const hashedPassword = await Captain.hashPassword(password);
            const captain = new Captain({
                fullname: {
                    firstname,
                    lastname
                },
                email,
                password: hashedPassword,
                vehicle
            });

            await captain.save();
            const token = captain.generateAuthToken();

            captain.password = undefined;
            res.status(201).json({
                success: true,
                message: "Captain registered successfully",
                token,
                captain
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    },
    loginCaptain: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const captain = await Captain.findOne({ email }).select('+password');
            if (!captain) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const isMatch = await captain.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const token = captain.generateAuthToken();
            captain.password = undefined;
            res.status(200).cookie("token", token).json({
                success: true,
                message: "Captain logged in successfully",
                token,
                captain
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    getProfile: async (req, res) => {
        try {
            res.status(200).json({
                success: true,
                captain: req.captain
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    logoutCaptain: async (req, res) => {
        try {
            const blacklistedToken = new BlacklistToken({
                token: req.token
            });
            await blacklistedToken.save();
            res.status(200).clearCookie("token").json({
                success: true,
                message: "Captain logged out successfully"
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}