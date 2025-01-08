import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import userRouter from './routes/userRouter.js';
import captainRouter from './routes/captainRouter.js';
import mapRouter from './routes/mapRouter.js'
import rideRouter from "./routes/rideRouter.js"
import { initializeSocket } from './socket.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// connect to MongoDB
db.connect();

const server = http.createServer(app);
initializeSocket(server);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', userRouter);
app.use("/api/captains", captainRouter);
app.use("/api/map", mapRouter)
app.use("/api/ride", rideRouter)


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});