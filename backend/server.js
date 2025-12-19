import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
import mongoose, { model } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/Routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);

const start = async() => {
    const connectionDB = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST:${connectionDB.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
    });
};

start();