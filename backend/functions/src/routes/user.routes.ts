import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";

const userRouter = Router();

// create a user
userRouter.post("/users", createUser);

// get all users
userRouter.get("/users", getAllUsers);

export default userRouter;
