import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    active: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}