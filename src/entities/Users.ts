import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm'
import { Posts } from './Posts';
import { Comments } from './Comments';

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({ default: true })
  active: boolean;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Posts, post => post.owner)
  posts: Posts[]

  @OneToMany(() => Comments, comment => comment.user)
  comments: Comments[];

}
