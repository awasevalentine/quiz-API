/* eslint-disable prettier/prettier */

import { HttpException } from "@nestjs/common"
import { GraphQLError } from "graphql"

export const CustomException = (error, message, code)=>{
    if(error?.code ===11000){
        throw new HttpException(message, code)
    }else{
        throw new GraphQLError(message, {
            path: error?.path,
            source: error?.source || code
            // code: error?.code
        })
    }
}