
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

export interface CreateQuizDto {
    title: string;
    description?: Nullable<string>;
}

export interface UpdateQuizDto {
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface CreateQuestionDto {
    quizId: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface UpdateQuestionDto {
    text?: Nullable<string>;
    options?: Nullable<string[]>;
    correctAnswer?: Nullable<string>;
}

export interface CreateScoreDto {
    userId: string;
    quizId: string;
    score: string;
}

export interface UpdateScoreDto {
    userId?: Nullable<string>;
    quizId?: Nullable<string>;
    score?: Nullable<string>;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    created_at: DateTime;
    updated_at: DateTime;
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

export interface Score {
    id: string;
    userId: User;
    quizId: Quiz;
    score: number;
    date: DateTime;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IQuery {
    getUser(username: string): User | Promise<User>;
    login(loginCredentials: LoginDto): string | Promise<string>;
    getAllQuiz(): Quiz[] | Promise<Quiz[]>;
    getQuiz(quizId: string): Quiz | Promise<Quiz>;
    getAllQuestions(): Question[] | Promise<Question[]>;
    getQuestion(questionId: string): Question | Promise<Question>;
    getAllScores(): Score[] | Promise<Score[]>;
    getScore(scoreId: string): Score | Promise<Score>;
    getScoreByUser(userId: string): Score[] | Promise<Score[]>;
    getScoreByQuiz(quizId: string): Score[] | Promise<Score[]>;
}

export interface IMutation {
    createUser(createUser: CreateUserDto): string | Promise<string>;
    updateUser(updatePayload: UpdateUserDto): User | Promise<User>;
    createQuiz(createQuizPayload: CreateQuizDto): Quiz | Promise<Quiz>;
    updateQuiz(quizId: string, updateQuizPayload: UpdateQuizDto): Quiz | Promise<Quiz>;
    deleteQuiz(quizId: string): string | Promise<string>;
    createQuestion(createQuestionPayload: CreateQuestionDto): Question | Promise<Question>;
    updateQuestion(questionId: string, updateQuestionPayload: UpdateQuestionDto): Question | Promise<Question>;
    deleteQuestion(questionId: string, quizId: string): string | Promise<string>;
    createScore(createScorePayload: CreateScoreDto): string | Promise<string>;
    updateScore(scoreId: string, updateScorePayload: UpdateScoreDto): Score | Promise<Score>;
    deleteScore(scoreId: string): Score | Promise<Score>;
}

export type DateTime = any;
type Nullable<T> = T | null;
