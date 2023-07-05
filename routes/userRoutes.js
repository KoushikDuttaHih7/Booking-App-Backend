import express from "express";
import {
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);
// GET ONE
router.get("/:id", getOneUser);
// GET ALL
router.get("/", getUsers);

export default router;
