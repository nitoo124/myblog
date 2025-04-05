import mongoose from "mongoose";

export const ConnectDB = async (): Promise<void> => {
  try {
    const mongoUri: string | undefined = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Process exit to restart the app if DB connection fails
  }
};
