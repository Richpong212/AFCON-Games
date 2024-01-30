import { Request, Response } from "express";
import UserGroup from "../models/userGroup.model";

// create a userGroup
export const createUserGroup = async (req: Request, res: Response) => {
  try {
    // get the userGroup details from the request body
    const userGroup = req.body;

    // check if userGroup details are complete
    if (!userGroup.name || !userGroup.league) {
      return res.status(400).json({
        message: "name and league are required",
      });
    }

    // check if the userGroup already exists
    const existingUserGroup = await UserGroup.findOne({ name: userGroup.name });

    if (existingUserGroup) {
      return res.status(400).json({
        message: "UserGroup already exists",
      });
    }

    // create a new userGroup
    const newUserGroup = new UserGroup(userGroup);

    const savedUserGroup = await newUserGroup.save();

    return res.status(201).json({
      message: "UserGroup created successfully",
      data: savedUserGroup,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all userGroups
export const getAllUserGroups = async (req: Request, res: Response) => {
  try {
    const userGroups = await UserGroup.find({}).populate("members", "name");

    return res.status(200).json({
      message: "UserGroups retrieved successfully",
      data: userGroups,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
