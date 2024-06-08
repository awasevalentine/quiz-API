/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { User } from 'src/models/intefaces/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(Context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(Context).getContext();
    const { username, password } = ctx.req.body.variables?.loginCredentials;
    const user: User = await this.userService.getUser(username);
    const foundPassword = await bcrypt.compare(password, user.password);
    if (foundPassword) {
      ctx.user = user;
      return true;
    } else {
      throw new UnauthorizedException('UnAuthenticated');
    }
  }
}