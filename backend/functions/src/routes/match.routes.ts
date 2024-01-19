import { Router } from "express";
import {
  createMatch,
  getMatches,
  getSingleMatch,
  updateMatch,
} from "../controllers/match.controller";

const matchRouter = Router();

// create a match
matchRouter.post("/matches", createMatch);

// get all matches
matchRouter.get("/matches", getMatches);

// get a single match
matchRouter.get("/matches/:id", getSingleMatch);

// update a match
matchRouter.put("/matches/:id", updateMatch);

export default matchRouter;
