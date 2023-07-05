import hotelModel from "../models/hotelModel.js";

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateHotel = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await hotelModel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getOneHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await hotelModel.findById(id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const countByType = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
