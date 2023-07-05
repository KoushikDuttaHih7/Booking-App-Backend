import express from "express";
const router = express.Router();
import {
  createHotel,
  deleteHotel,
  getHotels,
  getOneHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET ONE
router.get("/:id", getOneHotel);
// GET ALL
router.get("/", getHotels);

export default router;
