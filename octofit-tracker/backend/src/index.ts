import express from 'express';
import mongoose from 'mongoose';

const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit';
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    port: PORT,
    apiBaseUrl: API_BASE_URL,
  });
});

app.get('/api/users/', (req, res) => {
  const users = [
    { id: 1, name: 'Avery', role: 'member' },
    { id: 2, name: 'Jordan', role: 'coach' },
  ];
  res.json({ data: users });
});

app.get('/api/teams/', (req, res) => {
  const teams = [
    { id: 1, name: 'Ocean Sprinters', members: 12 },
    { id: 2, name: 'Mountain Movers', members: 9 },
  ];
  res.json({ data: teams });
});

app.get('/api/activities/', (req, res) => {
  const activities = [
    { id: 1, userId: 1, type: 'run', distanceKm: 5.2 },
    { id: 2, userId: 2, type: 'cycle', distanceKm: 18.4 },
  ];
  res.json({ data: activities });
});

app.get('/api/leaderboard/', (req, res) => {
  const leaderboard = [
    { userId: 2, points: 940 },
    { userId: 1, points: 880 },
  ];
  res.json({ data: leaderboard });
});

app.get('/api/workouts/', (req, res) => {
  const workouts = [
    { id: 1, title: 'Full-body HIIT', durationMinutes: 30 },
    { id: 2, title: 'Yoga recovery', durationMinutes: 45 },
  ];
  res.json({ data: workouts });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB at', MONGO_URL);
    console.log('API base URL:', API_BASE_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
