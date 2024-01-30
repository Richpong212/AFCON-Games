import { Document } from "mongoose";

// user interface for the database model
export interface IuserGroup extends Document {
  name: string;
  isAdmin: boolean;
  members: string[];
  league: string;
}
