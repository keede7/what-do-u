import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import User from "./entity/user.js";
import { UserContorller } from "./user.controller.js";
import { UserService } from "./user.service.js";

@Module({
    imports: [TypeOrmModule.forFeature( [User] )],
    controllers: [UserContorller],
    providers: [UserService],
})
export class UserModule {}