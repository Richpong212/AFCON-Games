import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserWithPredictions,
} from "../controllers/user.controller";

const userRouter = Router();

// create a user
userRouter.post("/users", createUser);

// get all users
userRouter.get("/users", getAllUsers);

// get a user with all predictions made
userRouter.get("/users/:id", getUserWithPredictions);

export default userRouter;
