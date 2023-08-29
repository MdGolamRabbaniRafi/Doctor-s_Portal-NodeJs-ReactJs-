import { IsEmail, IsString, Matches } from "class-validator";
import { DoctorEntity } from "src/Doctor/Doctor.dto";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./Patient.dto";

@Entity("Payment")
export class PaymentEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column({ nullable: true })
  makePayment: string;

  @PrimaryGeneratedColumn()
  id: number;

// @ManyToOne(() => DoctorEntity, doctor => doctor.payment)
// doctor: DoctorEntity[];

  
  
}

