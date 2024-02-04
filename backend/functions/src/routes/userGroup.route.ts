import { Router } from "express";
import {
  addGroupMember,
  createUserGroup,
  getAllUserGroups,
} from "../controllers/userGroups.controller";

const userGroupRouter = Router();

// create a userGroup
userGroupRouter.post("/user-groups", createUserGroup);

// get all userGroups
userGroupRouter.get("/user-groups", getAllUserGroups);

//add  a member to a userGroup
userGroupRouter.post("/user-groups/:groupid/add-member", addGroupMember);

export default userGroupRouter;
