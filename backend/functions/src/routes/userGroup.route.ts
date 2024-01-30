import { Router } from "express";
import {
  createUserGroup,
  getAllUserGroups,
} from "../controllers/userGroups.controller";

const userGroupRouter = Router();

// create a userGroup
userGroupRouter.post("/user-groups", createUserGroup);

// get all userGroups
userGroupRouter.get("/user-groups", getAllUserGroups);

export default userGroupRouter;
