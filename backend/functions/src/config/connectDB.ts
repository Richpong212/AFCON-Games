import mongoose from "mongoose";
import { devapp } from "./index.config";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(String(devapp.dev.db.uri));
    console.log(chalk.yellow(`MongoDB Connected: ${db.connection.host}`));
  } catch (error) {
    console.log(chalk.red(`Error: ${error}`));
  }
};

export default connectDB;
