/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
}
);
