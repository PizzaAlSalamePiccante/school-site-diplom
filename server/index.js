import configDotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware.js';
import registrationRouter from './router/registration.router.js';
import authRouter from './router/auth.router.js';
import classRouter from './router/class.router.js';
import cookieParser from 'cookie-parser';


configDotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());

// routers
app.use('/registration', registrationRouter);
app.use('/auth', authRouter)
app.use('/class', classRouter);

// middlewares
app.use(errorMiddleware);




const server_start = async (port, db_url) => {
    try {
        await mongoose.connect(db_url);
        app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));
    } catch (e) {
        console.log(`Server start issue - ${e}`);
    }
}

server_start(PORT, DB_URL);