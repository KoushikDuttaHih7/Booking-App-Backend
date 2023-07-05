import express from "express";
const router = express.Router();
import {
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id", verifyUser, deleteUser);
// GET ONE
router.get("/:id", verifyUser, getOneUser);
// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
