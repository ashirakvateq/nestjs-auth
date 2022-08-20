import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({type: 'varchar'})
    name: string

    @OneToMany(() => User, user => user.role)
    user : User;
}