import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
