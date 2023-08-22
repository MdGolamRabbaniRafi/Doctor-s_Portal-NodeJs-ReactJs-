import { IsEmail, IsString, Matches } from "class-validator";
import { DoctorEntity } from "src/Doctor/Doctor.dto";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./Patient.dto";

@Entity("Medicine")
export class MedicineEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column({ nullable: true })
  orderMedicine: string;

  @PrimaryGeneratedColumn()
  id: number;



  
  
}
