import { Role } from "src/roles/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type:'varchar'})
    phone_number: string

    @ManyToOne(() => Role, role => role.user, { cascade: true, onDelete: "SET NULL" })
    role: Role;

    @Column({type: 'boolean', unique: false, default: false})
    is_verified: boolean;

    @CreateDateColumn()
    created_at: Date 

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @Column({type: 'boolean', unique: false, default: false})
    is_blocked: boolean;

    @Column({type:'varchar', nullable: true})
    profile_image_url: string
}
