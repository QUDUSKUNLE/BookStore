import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @OneToMany(type => User, user => user.id)
  user: User[]
}
