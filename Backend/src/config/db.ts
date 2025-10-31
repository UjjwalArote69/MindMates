import mongoose from "mongoose";
import logger from "../utils/logger";
import chalk from "chalk";

const connetDB = async () => {
  try {
    logger.db("Connecting to MongoDB...", {
      uri: process.env.MONGODB_URI?.replace(/\/\/.*@/, "//*****@"), // Hide password
    });
    const db = await mongoose.connect(process.env.MONGO_URI!);
    logger.success(`MongoDB Connected: ${db.connection.host}`);
    logger.db("Database ready", { 
      name: db.connection.name,
      collections: Object.keys(db.connection.collections).length
    });
  } catch (error) {
    logger.box('CRITICAL: Database connection failed!', { color: chalk.red });
    logger.error("❌ MongoDB connection error: ", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connetDB;
