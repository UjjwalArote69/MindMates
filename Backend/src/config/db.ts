import mongoose from "mongoose";

const connetDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);
        console.log("✅ MongoDB connected successfully: ", db.connection.host);
        
    } catch (error) {
        console.error("❌ MongoDB connection error: ", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connetDB;