import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
connectDB();
// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
const PORT = process.env.PORT;

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/room", roomRoutes);

app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
});
