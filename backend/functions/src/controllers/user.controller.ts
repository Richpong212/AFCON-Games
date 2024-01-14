import Prediction from "../models/prediction.model";
import User from "../models/user.model";
import { Request, Response } from "express";

// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    // get the user details from the request body
    const user = req.body;

    // check if user details are complete
    if (!user.name) {
      return res.status(400).json({
        message: "name is  required",
      });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ name: user.name });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // create a new user
    const newUser = new User(user);

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get a user with all predictions made
export const getUserWithPredictions = async (req: Request, res: Response) => {
  try {
    // get the user id from the request params
    const { id } = req.params;

    // check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // get all predictions made by the user
    const predictions = await Prediction.find({ user: id });

    // sum up the pointsEarned for all predictions
    const totalPoints = predictions.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc, prediction: any) => acc + prediction.pointesEarned,
      0
    );

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        Points: totalPoints,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User fetched successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
