import mongoose from "mongoose";
import { Iuser } from "../interface/user.interface";

// user schema for the database model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    TeamToWin: {
      type: String,
      trim: true,
    },
    Points: {
      type: Number,
      default: 0,
    },

    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// user model for the database model
const User = mongoose.model<Iuser>("User", userSchema);
export default User;
