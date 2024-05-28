import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Comments } from './Comments'

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Comments, comment => comment.post)
    comments: Comments[];

    @ManyToOne(() => Users, user => user.posts)
    @JoinColumn({ name: 'user_id' })
    owner: Users;

}
