import mongoose from 'mongoose';

const MONGO_DB_NAME = 'octofit_db';
const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
export const MONGO_URL = process.env.MONGO_URL || `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

export async function connectDatabase() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB at', MONGO_URL);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

export default mongoose;
