/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateQuizDto, UpdateQuizDto } from 'src/models/dto/quiz.dto';
import { Quiz } from 'src/models/intefaces/types';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private quizModel: Model<Quiz>) {}

  async createQuiz(quizPayload: CreateQuizDto): Promise<Quiz> {
    try {
      const createdQuiz = new this.quizModel(quizPayload);
      return createdQuiz.save();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getAllQuiz(): Promise<Quiz[]> {
    try {
      return await this.quizModel.find().populate('questions').exec();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getQuiz(quizId: string): Promise<Quiz> {
    try {
      const foundQuiz = await this.quizModel
        .findById({ _id: quizId })
        .populate('questions')
        .exec();
      if (foundQuiz) {
        return foundQuiz;
      } else {
        throw new GraphQLError(`Quiz with the provided ID ${quizId} not found`);
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async updateQuiz(
    quizId: string,
    updateQuizPayload: UpdateQuizDto,
  ): Promise<Quiz> {
    try {
      const foundQuiz = await this.getQuiz(quizId);
      if (foundQuiz) {
        return await this.quizModel
          .findByIdAndUpdate(quizId, updateQuizPayload, { new: true })
          .exec();
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async addQuestionsUpdate(quizId: string, questionId: any): Promise<void> {
    try {
      await this.quizModel
        .findByIdAndUpdate(
          { _id: quizId },
          { $push: { questions: questionId } },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async deleteQuestionUpdate(
    quizId: string,
    questionId: string,
  ): Promise<void> {
    try {
      await this.quizModel.updateMany(
        { _id: quizId },
        { $pull: { questions: questionId } },
      );
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async deleteQuiz(quizId: string): Promise<string> {
    try {
      const foundQuiz = await this.getQuiz(quizId);
      if (foundQuiz) {
        const deleteQuiz = await this.quizModel
          .findByIdAndDelete({ _id: quizId })
          .exec();
        if (deleteQuiz) {
          return 'Quiz was successfully deleted!';
        }
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
