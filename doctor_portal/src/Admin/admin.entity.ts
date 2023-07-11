import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { NoticeEntity } from './noticeBoard.entity';

@Entity("Admin")
export class AdminEntity {
  @PrimaryGeneratedColumn()
id:number;
@Column({ name: 'fullname', type: 'varchar', length: 150, nullable: true })
name: string;

@Column({type: "varchar",length: 150, nullable: true})
email:string;
@Column({nullable: true})
phone:number;
@Column({nullable: true})
password:string;
@Column({nullable: true})
filenames:string;

  @OneToMany(() => DoctorEntity, doctor => doctor.admin)
  doctor: DoctorEntity[];

  @OneToMany(() => PatientEntity, patient => patient.admin)
  patient: PatientEntity[];

  // @OneToMany(() => PmailEntity, pmail => pmail.admin)
  // pmail: PmailEntity[];

  @OneToMany(() => NoticeEntity, notice => notice.admin)
  notice: NoticeEntity[];
}

