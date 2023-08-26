import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne, JoinColumn } from 'typeorm';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { NoticeEntity } from './noticeBoard.entity';
import { NotificationEntity } from './notification.entity';
import { SalaryEntity } from './salary.entity';
import { ProfileEntity } from './profile.entity';

@Entity("Admin")
export class AdminEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'varchar', length: 150, nullable: true })
name: string;

@Column({ type: "varchar", length: 150, nullable: true })
email: string;

// @Column({ nullable: true })
// phone: number;

@Column({ nullable: true })
password: string;

@Column()
Gender: string;
@Column()
Degree: string;
@Column()
Blood_group: string;
@Column({nullable: true})
User: string;



  @OneToMany(() => DoctorEntity, doctor => doctor.admin)
  doctor: AdminEntity[];

  @OneToMany(() => PatientEntity, patient => patient.admin)
  patient: AdminEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.admin)
  notification: DoctorEntity[];

  @OneToMany(() => NoticeEntity, notice => notice.admin)
  notice: AdminEntity[];


  @OneToOne(() => ProfileEntity, profile => profile.admin, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  
}





