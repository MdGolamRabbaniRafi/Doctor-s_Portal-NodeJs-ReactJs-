import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { AdminEntity } from 'src/Admin/admin.entity';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne, OneToOne } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';
import { PatientProfileEntity } from './PatientProfile.entity';

export class SignupPatientDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;

  // @Column({ nullable: true })
  // filenames: string;



  password: string;

  id: number;
  Gender: string;
  Degree: string;
  Blood_group: string;
  User:string;
}
export class PatientLoginDTO {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  password: string;
}

export class PatientInfo {
  name: string;
  email: string;
}


@Entity("Patient")
export class PatientEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column()
  password: string;

  @Column()
  Gender: string;
  @Column()
  Degree: string;
  @Column()
  Blood_group: string;
  @Column()
  User: string;

  @Column({ nullable: true })
  filenames: string;

  // @Column()
  // @IsString({ message: "invalid input " })//you have to make separate table for diagonised
  // diagonized: string;

  @PrimaryGeneratedColumn()
  id: number;
  
  // @Column({ nullable: true }) //you have to make separate table for feedback and also for medicine
  // feedback: string;
  // @Column({ nullable: true })
  // medicineOrder: string;

  @ManyToOne(() => AdminEntity, admin => admin.patient)
  admin: AdminEntity;

  @OneToMany(() => AppointmentEntity, appointment => appointment.patient)
  appointment: AppointmentEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.patient)
  notification: PatientEntity[];

  
  @OneToOne(() => PatientProfileEntity, Profile => Profile.patient)
   Profile: PatientEntity[];
  


}

