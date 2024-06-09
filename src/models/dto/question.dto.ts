/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class CreateQuestionDto {
  @Field()
  quizId: string;

  @Field()
  text: string;

  @Field(() => [String])
  options: string[];

  @Field()
  correctAnswer: string;
}


@InputType()
export class UpdateQuestionDto {
  @Field({nullable: true})
  text: string;

  @Field(() => [String], {nullable: true})
  options: string[];

  @Field({nullable: true})
  correctAnswer: string;
}

