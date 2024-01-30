import mongoose from "mongoose";
import { IuserGroup } from "../interface/userGroup.interface";

const userGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    members: [
      {
        type: String,
        unique: true,
      },
    ],
    league: {
      type: String,
      required: true,
    },

    isAdminName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserGroup = mongoose.model<IuserGroup>("UserGroup", userGroupSchema);
export default UserGroup;
