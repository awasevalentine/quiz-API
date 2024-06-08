/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { Roles } from "../intefaces/types";


@InputType()
export class CreateUserDto{

    @Field(()=> String)
    username: string;

    @Field(()=> String)
    email: string;

    @Field(()=> String)
    password: string

    @Field(()=> Roles, {defaultValue: Roles.USER, nullable: true})
    role: Roles
}

@InputType()
export class UpdateUserDto{

    @Field(()=> String, {nullable: true})
    username!: string;

    @Field(()=> String, {nullable: true})
    email!: string;

    @Field(()=> String, {nullable: true})
    password!: string

    @Field(()=> Roles, {defaultValue: Roles.USER, nullable: true})
    role!: Roles
}

@InputType()
export class LoginDto{

    @Field(()=> String)
    username: string;

    @Field(()=> String)
    password: string
}