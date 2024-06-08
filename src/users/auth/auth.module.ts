/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from './auth.guard';
import { JwthGuard } from './jwt.guard';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthGuard, JwthGuard],
  exports: []
})
export class AuthModule {}
