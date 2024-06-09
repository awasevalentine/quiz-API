/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/models/dto/user.dto';
import { User } from 'src/models/intefaces/types';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(payload: CreateUserDto): Promise<string> {
    try {
      const newUSer = new this.userModel(payload);
      await newUSer.save();
      if (newUSer) return 'User created successfully';
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getUser(username: string): Promise<User> {
    try {
      const foundUser = await this.userModel.findOne({ username });
      if (foundUser) {
        return foundUser;
      } else {
        throw new GraphQLError(
          `User with the provided username ${username} not found!`,
        );
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  async getUserById(userId: string): Promise<User> {
    try {
      const foundUser = await this.userModel.findOne({ _id: userId });
      if (foundUser) {
        return foundUser;
      } else {
        throw new GraphQLError(
          `User with the provided ID ${userId} not found!`,
        );
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async updateUser(
    userId: string,
    updatePayload: UpdateUserDto,
  ): Promise<User> {
    try {
      const foundUser = await this.getUserById(userId);
      if (foundUser) {
        return await this.userModel
          .findByIdAndUpdate(userId, updatePayload, { new: true })
          .exec();
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
