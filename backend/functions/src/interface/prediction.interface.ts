import { Document } from "mongoose";

// match interface for the database model
export interface IPrediction extends Document {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}
