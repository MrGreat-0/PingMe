import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server } from "./lib/socket.js"

dotenv.config();
// const app = express();

const PORT = process.env.PORT;
const APP_URL = process.env.APP_URL;

app.use(cors({
    origin: APP_URL,
    credentials: true
}));
app.use(cookieParser());
// Increase JSON and URL-encoded payload limits
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on - http://localhost:${PORT}`);
    connectDB();
});
