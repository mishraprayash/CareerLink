import mongoose from 'mongoose';

// Function to connect to MongoDB
let isconnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!isconnected) {
    console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isconnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};