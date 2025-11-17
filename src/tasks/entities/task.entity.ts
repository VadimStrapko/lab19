import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
//сущность task
@Entity()//помечает класс как сущность
export class Task {
  @PrimaryGeneratedColumn()//превичный ключ
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'user_id' })//внешний ключ
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
