/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
      catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        console.log("the message: :", response)
        if (exception.code === 11000) {
          response.status(400).json({ message: 'User already exists.' });
        } else {
          response.status(500).json({ message: 'Internal error.' });
        }
      }
}
