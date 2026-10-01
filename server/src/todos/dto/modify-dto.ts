import { IsString, IsBoolean, IsOptional } from 'class-validator';
import Todo from "../entity/todo.js";


class ModifyDto {
    
    @IsBoolean()
    checked: boolean
    
}

export default ModifyDto