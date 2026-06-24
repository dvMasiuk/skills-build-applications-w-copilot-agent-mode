import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  memberCount: number;
  members: Types.ObjectId[];
}

export interface ITeamDocument extends ITeam, Document {}

const teamSchema = new Schema<ITeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberCount: { type: Number, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Team = mongoose.models.Team || mongoose.model<ITeamDocument>('Team', teamSchema);
