import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
import mongoose, { model } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import OpenAI from "openai";


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const client = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// app.post("/test", async (req, res) => {
//     try {
//         const userMessage = req.body.messages;
//         if (!userMessage) return res.status(400).json({ error: "Message required" });

//         const completion = await client.chat.completions.create({
//             model: "gemini-flash-latest", 
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 { role: "user", content: userMessage },
//             ],
//         });

//         console.log("Success:", completion.choices[0].message.content);
//         res.send(completion.choices[0].message.content);

//     } catch (error) {
//         console.error("API Error:", error);
        
//         res.status(500).json({ 
//             error: "AI Generation Failed", 
//             details: error.message 
//         });
//     }
// });


const start = async() => {
    const connectionDB = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB CONNECTED HOST:${connectionDB.connection.host}`);

    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
    });
};

start();