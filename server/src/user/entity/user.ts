import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({
    name: 'users'
})
class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    private constructor(
        name: string
    ) {
        this.name = name
    }

    static bind(name: string): User {
        return new User(name)
    }
}

export default User

