/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/schemas/user.schema";
import { UserService } from "./user.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: "User", schema: UserSchema}])
    ],
    providers: [UserResolver, UserService],
    exports: [UserService],

})

export class UserModule{}