import mongoose from "mongoose";
import logger from "../utils/logger";

const connetDB = async () => {
    try {
        logger.db("Connecting to MongoDB...");
        const db = await mongoose.connect(process.env.MONGO_URI!);
        logger.success(`MongoDB Connected: ${db.connection.host}`);
    logger.db(`Database: ${db.connection.name}`);
        
    } catch (error) {
        logger.error("❌ MongoDB connection error: ", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connetDB;