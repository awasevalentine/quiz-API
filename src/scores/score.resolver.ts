/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScoreService } from './score.service';
import { Roles, Score } from 'src/models/intefaces/types';
import { CreateScoreDto, UpdateScoreDto } from 'src/models/dto/score.dto';
import { UseGuards } from '@nestjs/common';
import { JwthGuard } from 'src/users/auth/jwt.guard';
import { RoleGuard } from 'src/users/auth/role.guard';

@Resolver(() => Score)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @Mutation(() => String)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async createScore(
    @Args('createScorePayload') createScorePayload: CreateScoreDto,
  ) {
    return this.scoreService.createScore(createScorePayload);
  }

  @Query(() => [Score])
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async getAllScores(): Promise<Score[]> {
    return this.scoreService.getAllScores();
  }

  @Query(() => Score)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getScore(@Args('scoreId', { type: () => String }) scoreId: string) {
    return this.scoreService.getScore(scoreId);
  }

  @Query(() => [Score])
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async getScoreByUser(@Args('userId', { type: () => String }) userId: string) {
    return this.scoreService.getScoreByUser(userId);
  }

  @Query(() => [Score])
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async getScoreByQuiz(@Args('quizId', { type: () => String }) quizId: string) {
    return this.scoreService.getScoreByQuiz(quizId);
  }

  @Mutation(() => Score)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async updateScore(
    @Args('scoreId', { type: () => String }) scoreId: string,
    @Args('updateScorePayload') updateScorePayload: UpdateScoreDto,
  ) {
    return this.scoreService.updateScore(scoreId, updateScorePayload);
  }

  @Mutation(() => Score)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async deleteScore(@Args('scoreId', { type: () => String }) scoreId: string) {
    return this.scoreService.deleteScore(scoreId);
  }
}
