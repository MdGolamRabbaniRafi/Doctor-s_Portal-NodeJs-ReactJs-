import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PatientEntity } from "./Patient.dto";
import { IsInt } from "class-validator";

@Entity("appointment")
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Patient_name', type: "varchar", length: 150 })
  name: string;

  @IsInt({ message: "Age must be an integer" })
  @Column()
  age: number;

  @Column()
  date: string;

  @Column({ type: "varchar", length: 150 })
  time: string;

  @ManyToOne(() => PatientEntity, patient => patient.appointment)
  patient: PatientEntity;
}

