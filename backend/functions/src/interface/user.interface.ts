import { Document } from "mongoose";

// user interface for the database model
export interface Iuser extends Document {
  name: string;
  isAdmin: boolean;
}
