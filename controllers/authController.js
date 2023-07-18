import userModel from "../models/userModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      username: username,
      email: email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User Created");
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  // const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "Invalid username & password"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid username & password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      // .json({
      //   _id: user._id,
      //   username: user.username,
      //   email: user.email,
      //   createdAt: user.createdAt,
      //   updatedAt: user.updatedAt,
      //   isAdmin,
      // });
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
