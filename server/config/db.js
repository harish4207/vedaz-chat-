import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return false;
  }

  try {
    await mongoose.connect(uri);
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return false;
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}