import express from "express";
const app = express();
import connectDB from "./config/db.js";
connectDB();

import auth from './routes/auth.js';
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/auth', auth);

export default app;