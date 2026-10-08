import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from "./entity/user.js";
import SignUpDto from "./dto/signup.dto.js";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {

    }

     async signup(dto: SignUpDto): Promise<User> {
        const entity = dto.toEntity();

        return await this.userRepository.save(entity)
    }

}