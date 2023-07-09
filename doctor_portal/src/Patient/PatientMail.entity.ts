import { IsEmail, IsString, Matches } from "class-validator";
import { AdminEntity } from "src/Admin/admin.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./Patient.dto";

@Entity("Mail Patient")
export class PmailEntity {
 

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column()
  @IsString({ message: "invalid name" })
  subject: string;

  @Column()
  @IsString({ message: "invalid message" })
  message: string;


  @PrimaryGeneratedColumn()
  id: number;

//   @OneToMany(() => DoctorEntity, doctor => doctor.admin)
//   doctor: DoctorEntity[];

@ManyToOne(() => AdminEntity, admin => admin.pmail)
  admin: AdminEntity;

  
}