/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const ScoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
}
);
