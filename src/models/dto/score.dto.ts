/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScoreDto {
  @Field(()=> String)
  userId: string;

  @Field(()=> String)
  quizId: string;

  @Field(()=> String)
  score: number;
}

@InputType()
export class UpdateScoreDto {
  @Field(()=> String, {nullable: true})
  userId: string;

  @Field(()=> String, {nullable: true})
  quizId: string;

  @Field(()=> String, {nullable: true})
  score: number;
}
