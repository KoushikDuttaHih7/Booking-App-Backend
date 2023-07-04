import hotelModel from "../models/hotelModel.js";

// CREATE
export const createHotel = async (req, res) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    await hotelModel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ONE
export const getOneHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await hotelModel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL
export const getHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};
