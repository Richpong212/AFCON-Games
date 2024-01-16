import { Router } from "express";
import {
  createMatchPrediction,
  getAllPredictions,
  getPredictionById,
  updatePrediction,
} from "../controllers/prediction.controller";

const predictionRouter = Router();

// create a prediction
predictionRouter.post("/prediction/:matchid", createMatchPrediction);

// get all predictions
predictionRouter.get("/prediction", getAllPredictions);

// update a prediction by id
predictionRouter.put("/prediction/:id", updatePrediction);

// get a prediction by id
predictionRouter.get("/prediction/:id", getPredictionById);

export default predictionRouter;
