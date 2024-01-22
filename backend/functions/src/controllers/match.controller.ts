import Match from "../models/match.model";
import { Request, Response } from "express";
import Prediction from "../models/prediction.model";
import axios from "axios";
import { devapp } from "../config/index.config";

// create a match
export const createMatch = async (req: Request, res: Response) => {
  try {
    // get the match details from the request body
    const match = req.body;

    // check if match details are complete
    if (!match.homeTeam || !match.awayTeam) {
      return res.status(400).json({
        message: "homeTeam, awayTeam are required",
      });
    }

    // check if match already exists
    const matchExists = await Match.findOne({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    });
    if (matchExists) {
      return res.status(400).json({
        message: "Match already exists",
      });
    }

    // create the match
    const newMatch = new Match({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      matchDate: match.matchDate,
      matchTime: match.matchTime,
      matchVenue: match.matchVenue,
    });

    // save the match
    const savedMatch = await newMatch.save();

    return res.status(200).json({
      message: "Match created successfully",
      data: savedMatch,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all matches
export const getMatches = async (req: Request, res: Response) => {
  try {
    // get all matches with the latest match first
    const matches = await Match.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get a single match
export const getSingleMatch = async (req: Request, res: Response) => {
  try {
    // get the match id from the request params
    const matchId = req.params.id;

    // get the match
    const match = await Match.findById(matchId);

    return res.status(200).json({
      message: "Match fetched successfully",
      data: match,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// update a match
export const updateMatch = async (req: Request, res: Response) => {
  try {
    // get the match id from the request params
    const matchId = req.params.id;

    // get the match details from the request body
    const match = req.body;

    // check if match exists
    const matchExists = await Match.findById(matchId);
    if (!matchExists) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    // update the match
    const updatedMatch = await Match.findByIdAndUpdate(matchId, match, {
      new: true,
    });

    // find all predictions for the match that matched the updated match
    const predictions = await Prediction.find({ match: matchId });

    // find the match score for the updated match
    const matchScore = await Match.findById(matchId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchhomeScore: any = matchScore?.homeScore;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchawayScore: any = matchScore?.awayScore;

    // compare the predictions with the match score
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const comparedPredictions = predictions.map((prediction: any) => {
      const isPredictionCorrect =
        prediction.homeScore === matchhomeScore &&
        prediction.awayScore === matchawayScore;

      // if the home team wins with higher score than the away team
      const isPredictionWinnerHome =
        prediction.homeScore > prediction.awayScore &&
        matchhomeScore > matchawayScore;

      // if the away team wins with higher score than the home team
      const isPredictionWinnerAway =
        prediction.homeScore < prediction.awayScore &&
        matchhomeScore < matchawayScore;

      const isPredictionDraw =
        prediction.homeScore === prediction.awayScore &&
        matchhomeScore === matchawayScore;

      if (isPredictionCorrect) {
        // update the points earned for the correct prediction
        prediction.pointesEarned = 3;
      } else if (isPredictionWinnerHome || isPredictionWinnerAway) {
        // update the points earned for predicting the winner
        prediction.pointesEarned = 1;
      } else if (isPredictionDraw) {
        // update the points earned for predicting a draw
        prediction.pointesEarned = 1;
      } else {
        // update the points earned for incorrect prediction
        prediction.pointesEarned = 0;
      }

      return prediction;
    });

    // save the predictions to the database
    await Promise.all(
      comparedPredictions.map(async (prediction) => {
        await prediction.save();
      })
    );

    return res.status(200).json({
      message: "Match updated successfully",
      data: updatedMatch,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// live macthces
export const getliveMatches = async (req: Request, res: Response) => {
  try {
    // get all matches with the latest match first
    const options = {
      method: "GET",
      url: `${devapp.dev.matchesapi.uri}`,
      params: { live: "all" },
      headers: {
        "X-RapidAPI-Key": `${devapp.dev.matchesapi.apiKey}`,
        "X-RapidAPI-Host": `${devapp.dev.matchesapi.apiHost}`,
      },
    };

    const fetchMatches = await axios.request(options);

    // filter through the matches to find the one with CAF
    const matches = fetchMatches.data?.response?.filter(
      (match: { league: { name: string } }) =>
        match.league.name === "Africa Cup of Nations"
    );

    return res.status(200).json({
      message: "Matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
