import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import BlacklistToken from "../models/blacklistTokenModel.js";



export default {
    registerUser: async (req, res) => {
        try {
            console.log("registerUser body", req.body);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    success: false,
                    errors: errors.array() 
                });
            }

            const { firstname, lastname, email, password } = req.body;
            if (!firstname || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }

            // hash password and save user
            const hashedPassword = await User.hashPassword(password);
            const newUser = new User({
                fullname: {
                    firstname,
                    lastname,
                },
                email,
                password: hashedPassword,
            });

            // generate token
            const token = newUser.generateAuthToken();

            await newUser.save();
            newUser.password = undefined;
            res.status(201).cookie("token", token).json({
                success: true,
                message: "User registered successfully",
                token,
                user: newUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ 
            //         success: false,
            //         errors: errors.array() 
            //     });
            // }

            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // check if user exists
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email or Password!"
                });
            }

            // check if password is correct
            const passwordValid = await user.comparePassword(password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email or Password!"
                });
            }

            // generate token
            const token = user.generateAuthToken();
            user.password = undefined;

            res.status(200).cookie("token", token).json({
                success: true,
                message: "User logged in successfully",
                token,
                user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    getUserProfile: async (req, res) => {

        res.status(200).json({
            success: true,
            user: req.user,
            message: "User profile fetched successfully"
        });

    },
    logoutUser: async (req, res) => {
        try {
            const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            await BlacklistToken.create({ token });

            res.clearCookie("token").status(200).json({
                success: true,
                message: "User logged out successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}