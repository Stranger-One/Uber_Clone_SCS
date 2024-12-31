import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

export default {
    connect: () => {
        mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on("error", (error) => {
            console.log("MongoDB Connection Error: " + error);
        });
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected...");
        });
    }
}

