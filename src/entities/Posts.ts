import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Users, user => user.posts)
    @JoinColumn({ name: 'user_id' })
    owner: Users;

}
