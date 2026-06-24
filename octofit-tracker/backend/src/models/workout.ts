import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  focusArea: string;
}

export interface IWorkoutDocument extends IWorkout, Document {}

const workoutSchema = new Schema<IWorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  focusArea: { type: String, required: true },
});

export const Workout = mongoose.models.Workout || mongoose.model<IWorkoutDocument>('Workout', workoutSchema);
