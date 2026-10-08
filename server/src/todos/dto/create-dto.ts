import { IsString, IsBoolean, IsOptional } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import Todo from "../entity/todo.js";


class CreateDto {
    
    @ApiProperty({
        example: '장보기'
    })
    @IsString()
    title: string
    @ApiPropertyOptional({
        default: false
    })
    @IsBoolean()
    done: boolean = false
    
    toEntity(): Todo {
        return new Todo(
            this.title,
            this.done
        );
    }
}

export default CreateDto