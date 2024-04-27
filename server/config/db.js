import mongoose from 'mongoose';
import colors from "colors";

const connectDB = async () => {
  try {

    await retryConnecting();

    console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Server Issue ${error}`.bgRed.white);
  }
};

const retryConnecting = async () => {
  const maxRetryAttempts = 5;
  let retryCount = 0;

  while (retryCount < maxRetryAttempts) {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      break; 
    } catch (error) {
      retryCount++;
      console.log(`Connection attempt ${retryCount} failed. Retrying...`);

      if (retryCount < maxRetryAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        throw new Error(`Failed to connect to MongoDB after ${maxRetryAttempts} attempts.`);
      }
    }
  }
};

export default connectDB;
