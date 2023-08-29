import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PatientEntity } from "./Patient.dto";
import { IsInt } from "class-validator";
import { DoctorEntity } from "src/Doctor/Doctor.dto";

@Entity("appointment_Patient")
export class AppointmentPatientEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Patient_name', type: "varchar", length: 150 })
  name: string;

  @IsInt({ message: "Age must be an integer" })
  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  date: string;
  

  @Column({ type: "varchar", length: 150 })
  time: string;
  @ManyToOne(() => DoctorEntity, doctor => doctor.appointment)
  doctor: DoctorEntity;

  @ManyToOne(() => PatientEntity, patient => patient.appointment)
  patient: PatientEntity;

  
}


