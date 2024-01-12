import { Router } from "express";
import {
  createMatchPrediction,
  getAllPredictions,
} from "../controllers/prediction.controller";

const predictionRouter = Router();

// create a prediction
predictionRouter.post("/prediction/:matchid", createMatchPrediction);

// get all predictions
predictionRouter.get("/prediction", getAllPredictions);

export default predictionRouter;
