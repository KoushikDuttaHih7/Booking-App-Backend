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
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);
// GET ONE
router.get("/find/:id", getOneUser);
// GET ALL
router.get("/", getUsers);

export default router;
