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
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await hotelModel
      .find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 } })
      .limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// GET ALL Hotels COUNT BY CITY
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

// GET ALL Hotels COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
