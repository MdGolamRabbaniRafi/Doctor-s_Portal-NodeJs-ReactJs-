import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { AdminEntity } from 'src/Admin/admin.entity';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';
import { PmailEntity } from './PatientMail.entity';


export class SignupPatientDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;

  @IsString({ message: "invalid email" })
  diagonized: string;

  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  id: number;
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
  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  @Column()
  @IsString({ message: "invalid input " })
  diagonized: string;

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true })
  feedback: string;
  @Column({ nullable: true })
  medicineOrder: string;

  @ManyToOne(() => AdminEntity, admin => admin.patient)
  admin: AdminEntity;

  

}
