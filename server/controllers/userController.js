import { validationResult } from "express-validator";
import User from "../models/userModel.js";



export default {
    registerUser: async (req, res) => {
        try {
            console.log("registerUser body", req.body);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
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
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,
                newUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}