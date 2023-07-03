import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/database.js'
connectDB()
const app = express()
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`);
})