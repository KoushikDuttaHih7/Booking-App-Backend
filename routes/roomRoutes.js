import express from "express";
const router = express.Router();
import {
  createRoom,
  deleteRoom,
  getOneRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// GET ONE
router.get("/:id", getOneRoom);
// GET ALL
router.get("/", getRooms);

export default router;
