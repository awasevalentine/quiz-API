
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    role?: Nullable<Role>;
}

export interface UpdateUserDto {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<Role>;
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    password: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IQuery {
    getUser(username: string): User | Promise<User>;
    login(loginCredentials: LoginDto): string | Promise<string>;
}

export interface IMutation {
    createUser(createUser: CreateUserDto): string | Promise<string>;
    updateUser(updatePayload: UpdateUserDto): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
