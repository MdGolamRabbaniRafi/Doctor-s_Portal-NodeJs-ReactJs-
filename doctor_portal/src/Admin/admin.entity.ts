import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { NoticeEntity } from './noticeBoard.entity';

@Entity("Admin")
export class AdminEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column({ nullable: true })
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column()
  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  // @Column()
  // filenames:string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DoctorEntity, doctor => doctor.admin)
  doctor: DoctorEntity[];

  @OneToMany(() => PatientEntity, patient => patient.admin)
  patient: PatientEntity[];

  // @OneToMany(() => PmailEntity, pmail => pmail.admin)
  // pmail: PmailEntity[];

  @OneToMany(() => NoticeEntity, notice => notice.admin)
  notice: NoticeEntity[];
}

