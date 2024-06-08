/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum: ["ADMIN", "USER"], default: 'USER'}
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
      delete ret.password;
    }
  }
}

);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
