/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/loopscribe-quiz-db', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError = {
          message: error.message,
          statusCode: error?.extensions?.code,
          path: error?.path
        };
        return graphQLFormattedError;
      }
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
