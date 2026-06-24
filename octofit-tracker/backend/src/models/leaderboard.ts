import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILeaderboardEntry {
  user: Types.ObjectId;
  points: number;
  rank: number;
}

export interface ILeaderboardEntryDocument extends ILeaderboardEntry, Document {}

const leaderboardSchema = new Schema<ILeaderboardEntryDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntryDocument>('Leaderboard', leaderboardSchema);
