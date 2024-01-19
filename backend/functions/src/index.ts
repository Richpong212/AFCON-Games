import * as functions from "firebase-functions";
import express from "express";
import connectDB from "./config/connectDB";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.routes";
import matchRouter from "./routes/match.routes";
import predictionRouter from "./routes/prediction.routes";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

// routes for the server
app.get("/", (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({
      message: "Welcome to the AFCON Games API",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

app.use("/api/v1", userRouter); // user routes
app.use("/api/v1", matchRouter); // match routes
app.use("/api/v1", predictionRouter); // prediction routes

// connect the database
connectDB();

// Handle unknown routes (404 Not Found)
app.use((req: express.Request, res: express.Response) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

export const afcongames = functions.https.onRequest(app);
