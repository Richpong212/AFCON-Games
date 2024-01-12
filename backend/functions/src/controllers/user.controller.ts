import User from "../models/user.model";
import { Request, Response } from "express";

// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    // get the user details from the request body
    const user = req.body;

    // check if user details are complete
    if (!user.email || !user.name) {
      return res.status(400).json({
        message: "name and email are required",
      });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email: user.email });

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
