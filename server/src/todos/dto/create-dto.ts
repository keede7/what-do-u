import { IsString, IsBoolean, IsOptional } from 'class-validator';
import Todo from "../entity/todo.js";


class CreateDto {
    
    @IsString()
    private title: string
    @IsBoolean()
    private done: boolean = false
    
    toEntity(): Todo {
        return new Todo(
            0,
            this.title,
            this.done
        );
    }
}

export default CreateDto