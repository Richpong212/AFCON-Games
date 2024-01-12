import Match from "../models/match.model";
import { Request, Response } from "express";

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
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all matches
export const getMatches = async (req: Request, res: Response) => {
  try {
    // get all matches
    const matches = await Match.find({});

    return res.status(200).json({
      message: "Matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
