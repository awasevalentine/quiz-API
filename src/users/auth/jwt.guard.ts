/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken'


@Injectable()
export class JwthGuard implements CanActivate {

    async canActivate(Context: ExecutionContext): Promise<boolean>{
        const ctx = GqlExecutionContext.create(Context).getContext();
        const authorizationHeader = ctx.req.headers.authorization;
        if(authorizationHeader){
            const token = authorizationHeader.split(" ")[1];
            try{
                const user = jwt.verify(token, "#$%&^%sECRETKEY@#$%^&*().!y@#$%^&*()");
                ctx.user = user
                return true
            }catch(error) {
                throw new UnauthorizedException("Invalid Token : " + error.message)
            }
        }else{
            return false
        }
    }
}