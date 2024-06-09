/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Question, Roles } from 'src/models/intefaces/types';
import { QuestionService } from './question.service';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from 'src/models/dto/question.dto';
import { UseGuards } from '@nestjs/common';
import { JwthGuard } from 'src/users/auth/jwt.guard';
import { RoleGuard } from 'src/users/auth/role.guard';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async createQuestion(
    @Args('createQuestionPayload') createQuestionPayload: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.createQuestion(createQuestionPayload);
  }

  @Query(() => [Question])
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getAllQuestions(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }

  @Query(() => Question)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getQuestion(@Args('questionId') questionId: string): Promise<Question> {
    return this.questionService.getQuestion(questionId);
  }

  @Mutation(() => Question)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async updateQuestion(
    @Args('questionId') questionId: string,
    @Args('updateQuestionPayload') updateQuestionPayload: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.updateQuestion(
      questionId,
      updateQuestionPayload,
    );
  }

  @Mutation(() => String)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async deleteQuestion(
    @Args('questionId') questionId: string, @Args('quizId') quizId: string
  ): Promise<string> {
    return this.questionService.deleteQuestion(questionId, quizId);
  }
}
