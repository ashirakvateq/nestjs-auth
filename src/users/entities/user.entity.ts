import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type:'int'})
    id: number;

    @Column({type:'varchar'})
    first_name: string

    @Column({type:'varchar'})
    last_name: string

    @Column({type:'varchar'})
    user_name: string

    @Column({type:'varchar', unique:true})
    email: string 

    @Column({type:'varchar'})
    password: string 

    @CreateDateColumn()
    created_at: Date 

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}
