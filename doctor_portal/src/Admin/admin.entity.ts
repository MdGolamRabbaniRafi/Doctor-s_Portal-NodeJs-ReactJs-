import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne } from 'typeorm';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { NoticeEntity } from './noticeBoard.entity';
import { NotificationEntity } from './notification.entity';

@Entity("Admin")
export class AdminEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'varchar', length: 150, nullable: true })
name: string;

@Column({ type: "varchar", length: 150, nullable: true })
email: string;

@Column({ nullable: true })
phone: number;

@Column({ nullable: true })
password: string;

@Column({ nullable: true })
filenames: string;

  @OneToMany(() => DoctorEntity, doctor => doctor.admin)
  doctor: DoctorEntity[];

  @OneToMany(() => PatientEntity, patient => patient.admin)
  patient: PatientEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.admin)
  notification: DoctorEntity[];

  @OneToMany(() => NoticeEntity, notice => notice.admin)
  notice: NoticeEntity[];

  @OneToOne(() => AdminProfileEntity, profile => profile.admin)
  profile: AdminEntity[];
}

@Entity("AdminProfile")
export class AdminProfileEntity{
@PrimaryGeneratedColumn()
id:number;
// @Column()
// name:string;
@Column({type: "varchar",length: 150})
photo:string;


@OneToOne(() => AdminEntity, admin => admin.profile)
admin: AdminEntity;
}

