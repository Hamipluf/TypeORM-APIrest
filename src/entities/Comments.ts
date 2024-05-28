import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Entity('comments')
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Posts, post => post.comments)
    post: Posts;

    @ManyToOne(() => Users, user => user.comments)
    user: Users;

    @CreateDateColumn()
    created_at: Date;
}
