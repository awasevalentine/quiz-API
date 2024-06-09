/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}


@InputType()
export class UpdateQuizDto {
  @Field({nullable: true})
  title?: string;

  @Field({ nullable: true })
  description?: string;
}


@InputType()
export class AddOptionDtion {
  @Field()
  quizId: string;

  @Field()
  option: string;
}

