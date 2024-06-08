/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';



@ObjectType()
export class Quiz {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Question])
  questions: Question[];

  @Field()
  created_at: Date;


  @Field()
  updated_at: Date
}



@ObjectType()
export class Question {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => [String])
  options: string[];

  @Field()
  correctAnswer: string;

  @Field()
  created_at: Date;


  @Field()
  updated_at: Date
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(()=> Roles)
  role: Roles;

  @Field()
  password: string

  @Field()
  created_at: Date;


  @Field()
  updated_at: Date
}

@ObjectType()
export class Score {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  quizId: string;

  @Field()
  score: number;

  @Field()
  date: Date;

  @Field()
  created_at: Date;


  @Field()
  updated_at: Date
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER"
}

registerEnumType(Roles, {
  name: 'Role',
});
