/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import * as jwt from 'jsonwebtoken'


@Injectable()
export class JwthGuard implements CanActivate {

    async canActivate(Context: ExecutionContext): Promise<boolean>{
        const ctx = GqlExecutionContext.create(Context).getContext();
        const authorizationHeader = ctx?.req?.headers?.authorization;
        if(authorizationHeader){
            const token = authorizationHeader.split(" ")[1];
            try{
                const user = jwt.verify(token, process.env.JWT_SECRET);
                ctx.user = user
                return true
            }catch(error) {
                throw new GraphQLError(error?.message)
            }
        }else{
            return false
        }
    }
}