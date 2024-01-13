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
    email: {
      type: String,
      //required: true,
      unique: true,
      trim: true,
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
