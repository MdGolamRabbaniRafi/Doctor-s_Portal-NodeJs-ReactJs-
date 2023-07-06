import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { DoctorEntity } from '../Doctor/Doctor.dto';

@Entity("Admin")
export class AdminEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column()
  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DoctorEntity, doctor => doctor.admin)
  doctor: DoctorEntity[];
}

