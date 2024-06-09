/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz, Roles } from 'src/models/intefaces/types';
import { CreateQuizDto, UpdateQuizDto } from 'src/models/dto/quiz.dto';
import { UseGuards } from '@nestjs/common';
import { JwthGuard } from 'src/users/auth/jwt.guard';
import { RoleGuard } from 'src/users/auth/role.guard';


@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Mutation(() => Quiz)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async createQuiz(@Args('createQuizPayload') createQuizPayload: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizPayload);
  }

  @Query(() => [Quiz])
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getAllQuiz(): Promise<Quiz[]>{
    return this.quizService.getAllQuiz();
  }

  @Query(() => Quiz)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getQuiz(@Args('quizId') quizId: string): Promise<Quiz> {
    return this.quizService.getQuiz(quizId);
  }

  @Mutation(() => Quiz)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async updateQuiz(@Args('quizId') quizId: string, @Args('updateQuizPayload') updateQuizPayload: UpdateQuizDto): Promise<Quiz> {
    return this.quizService.updateQuiz(quizId, updateQuizPayload);
  }

  @Mutation(() => String)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async deleteQuiz(@Args('quizId') quizId: string): Promise<string> {
    return this.quizService.deleteQuiz(quizId);
  }
}
