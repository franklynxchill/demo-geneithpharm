import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // prevent multiple connections in development (hot reload issue)
    if (mongoose.connection.readyState >= 1) {
      console.log("🟢 MongoDB already connected");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`🟢 MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error);
    process.exit(1);
  }
};


