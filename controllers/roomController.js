import roomModel from "../models/roomModel.js";
import hotelModel from "../models/hotelModel.js";
import { createError } from "../utils/error.js";

// CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new roomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE Availablility
export const updateRoomAvailablility = async (req, res, next) => {
  const { id } = req.params;
  try {
    await roomModel.updateOne(
      { "roomNumbers._id": id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room has been booked");
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const { id } = req.params;
  try {
    await roomModel.findByIdAndDelete(id);
    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getOneRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await roomModel.findById(id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
