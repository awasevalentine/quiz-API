/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/models/schemas/question.schema';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuizSchema } from 'src/models/schemas/quiz.schema';
import { QuizService } from 'src/quiz/quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Question', schema: QuestionSchema },
      { name: 'Quiz', schema: QuizSchema },
    ]),
  ],
  providers: [QuestionService, QuestionResolver, QuizService],
})
export class QuestionModule {}
