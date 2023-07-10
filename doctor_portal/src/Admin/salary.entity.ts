import { IsEmail, IsString, Matches } from "class-validator";
import { AdminEntity } from "src/Admin/admin.entity";
import { DoctorEntity } from "src/Doctor/Doctor.dto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";






@Entity("Salary")
export class SalaryEntity {
 

  @Column()
  salary: number;

  @ManyToOne(() => DoctorEntity, doctor => doctor.salary)
  @JoinColumn({ name: "doctorId" })
  @PrimaryGeneratedColumn()
  doctor: DoctorEntity;

  @Column()
  doctorId: number;
}
