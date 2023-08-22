import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PatientEntity } from "./Patient.dto";



@Entity("Patient_Notification")
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Message', type: "varchar", length: 150 })
  Message: string;
  @Column({ name: 'Date', type: "varchar", length: 150 })
  date: string;
  @Column({ name: 'Time', type: "varchar", length: 150 })
  time: string;


  @ManyToOne(() => PatientEntity, patient => patient.notification)
  patient: PatientEntity;
}