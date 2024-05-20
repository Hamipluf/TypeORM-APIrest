import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm'
import { Posts } from './Posts';

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  active: boolean;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Posts, post => post.owner)
  posts: Posts[]

}