import { Router } from "express";
import {
  createMatch,
  getMatches,
  getSingleMatch,
} from "../controllers/match.controller";

const matchRouter = Router();

// create a match
matchRouter.post("/matches", createMatch);

// get all matches
matchRouter.get("/matches", getMatches);

// get a single match
matchRouter.get("/matches/:id", getSingleMatch);

export default matchRouter;
