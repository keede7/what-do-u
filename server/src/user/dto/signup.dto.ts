import User from "../entity/user.js"
import {IsNotEmpty} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

class SignUpDto {

    @IsNotEmpty()
    @ApiProperty({
        example: '사용자1'
    })
    name: string

    toEntity(): User {
        return User.bind(this.name)
    }

}

export default SignUpDto
