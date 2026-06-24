import express from 'express';
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit';
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'OctoFit Tracker API', port: PORT });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB at', MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
