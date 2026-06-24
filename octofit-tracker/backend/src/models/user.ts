import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  team?: Types.ObjectId;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'] },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export const User = mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema);
