import UserModel from "../models/userModel.js";

// UPDATE
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
