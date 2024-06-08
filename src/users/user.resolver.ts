/* eslint-disable prettier/prettier */
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Roles, User } from 'src/models/intefaces/types';
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
} from 'src/models/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { JwthGuard } from './auth/jwt.guard';
import { RoleGuard } from './auth/role.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async createUser(
    @Args('createUser') createUser: CreateUserDto,
  ): Promise<string> {
    return await this.userService.createUser(createUser);
  }

  @Mutation(() => User)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN, Roles.USER]))
  async updateUser(
    @Context('user') user: User,
    @Args('updatePayload') updatePayload: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(user?.id, updatePayload);
  }

  @Query(() => User)
  @UseGuards(JwthGuard, new RoleGuard([Roles.ADMIN]))
  async getUser(@Args('username') username: string): Promise<User> {
    return this.userService.getUser(username);
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args('loginCredentials') loginCredentials: LoginDto,
    @Context('user') user: User,
  ): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user?.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
    return jwt.sign(payload, '#$%&^%sECRETKEY@#$%^&*().!y@#$%^&*()', {
      expiresIn: '1d',
    });
  }
}
