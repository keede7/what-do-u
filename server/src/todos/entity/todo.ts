import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column({
        default: false,
    })
    done?: boolean;

    constructor(
        title: string,
        done?: boolean
    ) {
        this.title = title
        this.done = done
    }
}

export default Todo