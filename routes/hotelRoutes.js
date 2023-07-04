import express from "express";
const router = express.Router();
import {
  createHotel,
  deleteHotel,
  getHotels,
  getOneHotel,
  updateHotel,
} from "../controllers/hotelController.js";

// CREATE
router.post("/", createHotel);
// UPDATE
router.put("/:id", updateHotel);
// DELETE
router.delete("/:id", deleteHotel);
// GET ONE
router.get("/:id", getOneHotel);
// GET ALL
router.get("/", getHotels);

export default router;
