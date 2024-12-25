import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1); // Exit the process with failure
  }

  try {
    await mongoose.connect(mongoUri); // No need to pass deprecated options
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error(`Error closing MongoDB connection: ${err.message}`);
  }
};

export default connectDB;