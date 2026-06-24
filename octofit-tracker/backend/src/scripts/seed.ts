import { connectDatabase, disconnectDatabase, MONGO_URL } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  try {
    await connectDatabase();
    console.log('Seed the database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Avery Collins', email: 'avery.collins@example.com', role: 'member' },
      { name: 'Jordan Patel', email: 'jordan.patel@example.com', role: 'coach' },
      { name: 'Leila Kim', email: 'leila.kim@example.com', role: 'member' },
    ]);

    const teams = await Team.create([
      {
        name: 'Ocean Sprinters',
        description: 'A coastal running team focused on sprint workouts and recovery.',
        memberCount: 2,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Mountain Movers',
        description: 'A strength and endurance crew that loves hill repeats.',
        memberCount: 1,
        members: [users[2]._id],
      },
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 38,
        distanceKm: 7.3,
        caloriesBurned: 520,
        date: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      {
        user: users[1]._id,
        type: 'yoga',
        durationMinutes: 42,
        caloriesBurned: 210,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 680,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ]);

    const leaderboard = await Leaderboard.create([
      { user: users[1]._id, points: 1420, rank: 1 },
      { user: users[0]._id, points: 1290, rank: 2 },
      { user: users[2]._id, points: 1185, rank: 3 },
    ]);

    const workouts = await Workout.create([
      {
        title: 'Sand Sprint Circuit',
        description: 'High-intensity running drills with active recovery on the beach.',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        focusArea: 'Cardio',
      },
      {
        title: 'Strength & Stability',
        description: 'Full-body resistance training with core stability work.',
        durationMinutes: 50,
        difficulty: 'Advanced',
        focusArea: 'Strength',
      },
      {
        title: 'Sunrise Recovery Flow',
        description: 'A calming yoga session to improve mobility and breathing.',
        durationMinutes: 40,
        difficulty: 'Beginner',
        focusArea: 'Recovery',
      },
    ]);

    console.log('Seed complete:');
    console.log('  users:', users.length);
    console.log('  teams:', teams.length);
    console.log('  activities:', activities.length);
    console.log('  leaderboard entries:', leaderboard.length);
    console.log('  workouts:', workouts.length);

    await disconnectDatabase();
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  }
}

seed();
