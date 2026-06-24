import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'strength' | 'yoga';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

export interface IActivityDocument extends IActivity, Document {}

const activitySchema = new Schema<IActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['run', 'cycle', 'swim', 'strength', 'yoga'] },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Activity = mongoose.models.Activity || mongoose.model<IActivityDocument>('Activity', activitySchema);
