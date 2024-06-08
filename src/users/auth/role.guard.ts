/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class RoleGuard implements CanActivate {

    public role: string[]

    constructor(role: string[]){
        this.role = role
    }


    canActivate(Context: ExecutionContext): boolean{
        const ctx = GqlExecutionContext.create(Context).getContext();
        const {role} = ctx.user;

        if (this.role.includes(role)) {
            return true;
          }
        return false
    }
}