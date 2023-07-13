import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { DoctorEntity } from "./Doctor.dto";

@Entity("Refer")
export class ReferEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Patient_Name', type: "varchar", length: 150 })
  Refer: string;
  @Column({ name: 'Doctor name', type: "varchar", length: 150 })
  ReferTo: string;



  @OneToOne(() => DoctorEntity, doctor => doctor.refer)
  doctor: DoctorEntity;
}
