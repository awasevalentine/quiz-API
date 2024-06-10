/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateScoreDto } from 'src/models/dto/score.dto';
import { Score } from 'src/models/intefaces/types';

@Injectable()
export class ScoreService {
  constructor(@InjectModel('Score') private scoreModel: Model<Score>) {}

  async createScore(createScorePayload: CreateScoreDto): Promise<string> {
    try {
      const createdScore = new this.scoreModel(createScorePayload);
      await createdScore.save();
      if(createdScore) return "Score Added successfully"
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getAllScores(): Promise<Score[]> {
    try {
      return await this.scoreModel
        .find()
        .populate('userId')
        .populate({
          path: 'quizId',
          populate: {
            path: 'questions',
          },
        })
        .exec();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getScore(scoreId: string): Promise<Score> {
    try {
      const foundScore = await this.scoreModel
        .findById({ _id: scoreId })
        .populate('userId')
        .populate({
          path: 'quizId',
          populate: {
            path: 'questions',
          },
        })
        .exec();
      if (foundScore) {
        return foundScore;
      } else {
        throw new GraphQLError(
            `Score with the provided ID ${scoreId} not found`
        );
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getScoreByUser(userId: string): Promise<Score[]> {
    try {
      const foundScore = await this.scoreModel
        .find({ userId })
        .populate('userId')
        .populate({
          path: 'quizId',
          populate: {
            path: 'questions',
          },
        })
        .exec();
      if (foundScore) {
        return foundScore;
      } else {
        throw new GraphQLError(`Score with the provided user ID ${userId} not found`);
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getScoreByQuiz(quizId: string): Promise<Score[]> {
    try {
      const foundScore = await this.scoreModel
        .find({ quizId })
        .populate('userId')
        .populate({
          path: 'quizId',
          populate: {
            path: 'questions',
          },
        })
        .exec();
      if (foundScore) {
        return foundScore;
      } else {
        throw new GraphQLError(`Score with the provided quiz Id ${quizId} not found`);
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async updateScore(
    scoreId: string,
    updateScorePayload: CreateScoreDto,
  ): Promise<Score> {
    try {
      const foundScore = await this.getScore(scoreId);
      if (foundScore) {
        return await this.scoreModel
          .findByIdAndUpdate(scoreId, updateScorePayload, { new: true })
          .exec();
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async deleteScore(scoreId: string): Promise<string> {
    try {
      const foundScore = await this.getScore(scoreId);
      if (foundScore) {
        const deleteScore = await this.scoreModel
          .findByIdAndDelete({ _id: scoreId })
          .exec();
        if (deleteScore) {
          return 'Successfully deleted score!';
        }
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
