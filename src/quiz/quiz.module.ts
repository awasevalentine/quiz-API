/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from 'src/models/schemas/quiz.schema';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';


@Module({
  imports: [MongooseModule.forFeature([{ name: "Quiz", schema: QuizSchema }])],
  providers: [QuizService, QuizResolver],
  exports: [QuizService]
})
export class QuizModule {}
