import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { DoctorEntity } from "./Doctor.dto";

@Entity("File Information")
export class FileEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'File Name', type: "varchar", length: 150 })
  File: string;

  @OneToOne(() => DoctorEntity, doctor => doctor.files)
  @JoinColumn()
  doctor: DoctorEntity;
}
