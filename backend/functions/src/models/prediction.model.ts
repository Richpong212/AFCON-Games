import mongoose from "mongoose";
import { IPrediction } from "../interface/prediction.interface";
// prediction schema for the database model
const predictionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeScore: { type: Number, default: 0 },
    awayScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// prediction model for the database model
const Prediction = mongoose.model<IPrediction>("Prediction", predictionSchema);
export default Prediction;
