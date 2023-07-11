import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DoctorEntity } from "./Doctor.dto";
import { IsInt } from "class-validator";
import { DoctorModule } from './doctor.module';


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

  @ManyToOne(() => DoctorEntity, doctor => doctor.appointment)
  doctor: DoctorEntity;
}
