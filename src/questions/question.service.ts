/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from 'src/models/dto/question.dto';
import { Question } from 'src/models/intefaces/types';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question') private questionModel: Model<Question>,
    private quizService: QuizService,
  ) {}

  async createQuestion(
    createQuestionPayload: CreateQuestionDto,
  ): Promise<Question> {
    try {
      const { quizId, ...rest } = createQuestionPayload;
      const foundQuiz = await this.quizService.getQuiz(quizId);
      if (foundQuiz) {
        const createdQuestion = new this.questionModel(rest);
        const saveQuestion = await createdQuestion.save();
        this.quizService.addQuestionsUpdate(quizId, saveQuestion?._id);
        return saveQuestion;
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    try {
      return await this.questionModel.find().exec();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async getQuestion(questionId: string): Promise<Question> {
    try {
      const foundQuestion = await this.questionModel
        .findById({ _id: questionId })
        .exec();
      if (foundQuestion) {
        return foundQuestion;
      } else {
        throw new GraphQLError(
          `No question found with the provided ID ${questionId}`,
        );
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async updateQuestion(
    questionId: string,
    updateQuestionPayload: UpdateQuestionDto,
  ): Promise<Question> {
    try {
      const foundQuestion = await this.getQuestion(questionId);
      if (foundQuestion) {
        return this.questionModel
          .findByIdAndUpdate(questionId, updateQuestionPayload, {
            new: true,
          })
          .exec();
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async deleteQuestion(questionId: string, quizId: string): Promise<string> {
    try {
      const foundQuizAndQuestion = Promise.all([
        await this.getQuestion(questionId),
        await this.quizService.getQuiz(quizId),
      ]);
      if (foundQuizAndQuestion) {
        const deleteQuestion = Promise.all([
          await this.questionModel
            .findByIdAndDelete({ _id: questionId })
            .exec(),
          await this.quizService.deleteQuestionUpdate(quizId, questionId),
        ]);
        if (deleteQuestion) {
          return 'Question deleted successfully!';
        }
      }
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
