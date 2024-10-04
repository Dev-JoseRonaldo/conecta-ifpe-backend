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

  @Column({ nullable: true }) // Permite que este campo seja nulo
  siape: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  campus: string;

  @Column({ nullable: true })
  phone: string;
}
