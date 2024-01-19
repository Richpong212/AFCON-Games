import { Document } from "mongoose";

// match interface for the database model
export interface Imatch extends Document {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}
