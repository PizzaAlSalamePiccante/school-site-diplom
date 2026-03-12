import configDotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware.js';
import router from './router/auth.router.js';


configDotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());

// routers
app.use('/auth', router);

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