import { IsDefined, IsEmail, IsString, Matches } from "class-validator";
import { AdminEntity } from "src/Admin/admin.entity";
import { DoctorEntity } from "src/Doctor/Doctor.dto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";






@Entity("Salary")
export class SalaryEntity {
  @Column()
  salary: string;

  @ManyToOne(() => DoctorEntity, doctor => doctor.salary)
  @JoinColumn({ name: "doctorId" })
  doctor: DoctorEntity;

  @PrimaryGeneratedColumn()
  code: number;


}