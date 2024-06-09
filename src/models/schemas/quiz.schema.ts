/* eslint-disable prettier/prettier */
import {Schema } from 'mongoose';

export const QuizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
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