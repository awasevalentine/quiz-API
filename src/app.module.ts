/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { GraphQLError } from 'graphql';
import { AuthModule } from './users/auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './questions/questions.module';
import { ScoreModule } from './scores/score.module';
import { FormatError } from './utils/formatError';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URI, {
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      context: ({req})=> ({req}),
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      formatError: (error: GraphQLError) => {
        return FormatError(error)
      },
    }),

    UserModule,
    AuthModule,
    QuizModule,
    QuestionModule,
    ScoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
