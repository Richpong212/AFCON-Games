import { Request, Response } from "express";
import Match from "../models/match.model";
import User from "../models/user.model";
import Prediction from "../models/prediction.model";

// create a match
export const createMatchPrediction = async (req: Request, res: Response) => {
  try {
    // get the match details from the request body
    const match = req.body;

    // get the match id from the request params
    const matchId = req.params.matchid;

    // check if match details are complete
    if (!match.homeScore || !match.awayScore) {
      return res.status(400).json({
        message: "Please provide the match scores",
      });
    }

    // find the match in the database
    const oneMatch = await Match.findById(matchId);

    // find the user in the database by name
    const user = await User.findOne({ name: match.user });

    const userId = user?._id;

    // check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // check if match exists
    if (!oneMatch) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    // find one prediction for the match
    const onePrediction = await Prediction.findOne({
      match: matchId,
      user: userId,
    });

    // check if prediction exists
    if (onePrediction) {
      return res.status(400).json({
        message: "Prediction already made for this match",
      });
    }

    // create a prediction for the match
    const prediction = await Prediction.create({
      ...match,
      match: matchId,
      user: userId,
    });

    // save the prediction to the database
    const savedPrediction = await prediction.save();

    return res.status(200).json({
      message: "Prediction created successfully",
      data: savedPrediction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all predictions
export const getAllPredictions = async (req: Request, res: Response) => {
  try {
    // get all predictions from the database
    const predictions = await Prediction.find()
      .populate("user")
      .populate("match")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Predictions retrieved successfully",
      data: predictions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// update a prediction by id
export const updatePrediction = async (req: Request, res: Response) => {
  try {
    // get the prediction id from the request params
    const predictionId = req.params.id;

    // get the prediction details from the request body
    const prediction = req.body;

    // check if the prediction exists
    const existingPrediction = await Prediction.findById(predictionId);
    if (!existingPrediction) {
      return res.status(404).json({
        message: "Prediction not found",
      });
    }

    // check if prediction details are complete
    if (!prediction.homeScore || !prediction.awayScore) {
      return res.status(400).json({
        message: "Please provide the prediction scores",
      });
    }

    // find the prediction in the database
    const onePrediction = await Prediction.findById(predictionId);

    // check if prediction exists
    if (!onePrediction) {
      return res.status(404).json({
        message: "Prediction not found",
      });
    }

    // update the prediction
    const updatedPrediction = await Prediction.findByIdAndUpdate(
      predictionId,
      prediction,
      { new: true }
    );

    return res.status(200).json({
      message: "Prediction updated successfully",
      data: updatedPrediction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// find a prediction by id
export const getPredictionById = async (req: Request, res: Response) => {
  try {
    // get the prediction id from the request params
    const predictionId = req.params.id;

    // find the prediction in the database
    const prediction = await Prediction.findById(predictionId)
      .populate("user")
      .populate("match");

    // check if prediction exists
    if (!prediction) {
      return res.status(404).json({
        message: "Prediction not found",
      });
    }

    return res.status(200).json({
      message: "Prediction retrieved successfully",
      data: prediction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
