import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import User from '../../user/entity/user.js';

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

    @ManyToOne(
        () => User, 
        {createForeignKeyConstraints: false}
    )
    @JoinColumn({
        name: 'user_id',
    })
    user: User

    constructor(
        title: string,
        done?: boolean
    ) {
        this.title = title
        this.done = done
    }
}

export default Todo