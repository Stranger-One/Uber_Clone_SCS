import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// connect to MongoDB
db.connect();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});