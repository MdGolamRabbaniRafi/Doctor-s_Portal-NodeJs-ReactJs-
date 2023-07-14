import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { AdminEntity } from 'src/Admin/admin.entity';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';

export class SignupPatientDTO {
  @IsString({ message: 'invalid name' })
  @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
  name: string;

  @IsEmail({}, { message: 'invalid email' })
  email: string;

  // @IsString({ message: "invalid email" })
  // diagonized: string;

  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  id: number;
}

export class PatientInfo {
  name: string;
  email: string;
}

@Entity('Patient')
export class PatientEntity {
  @Column()
  @IsString({ message: 'invalid name' })
  @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
  name: string;

  @Column()
  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @Column()
  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  // @Column()
  // @IsString({ message: "invalid input " })//you have to make separate table for diagonised
  // diagonized: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) //you have to make separate table for feedback and also for medicine
  feedback: string;
  @Column({ nullable: true })
  medicineOrder: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.patient)
  admin: AdminEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointment: AppointmentEntity[];
}
