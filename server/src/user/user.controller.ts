import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import User from "./entity/user.js";
import SignUpDto from "./dto/signup.dto.js";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserContorller {
    
    constructor(
        private readonly userService: UserService
    ) {

    }

    @Post()
    @ApiOperation({
        summary: '회원가입'
    })
    signup(@Body() dto: SignUpDto): Promise<User> {
        console.log(`dto : ${JSON.stringify(dto)}`)
        return this.userService.signup(dto)
    }

}