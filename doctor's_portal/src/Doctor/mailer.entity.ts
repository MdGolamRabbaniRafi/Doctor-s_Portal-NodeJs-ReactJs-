import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { DoctorEntity } from "./Doctor.dto";

@Entity("Mailar")
export class MailerEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Send to', type: "varchar", length: 150 })
  to: string;
  @Column({ name: 'Subject', type: "varchar", length: 150 })
  subject: string;
  @Column({ name: 'Body', type: "varchar", length: 150 })
  text: string;
  @Column({ name: 'Date', type: "varchar", length: 150 })
  Date: string;
  @Column({ name: 'Time', type: "varchar", length: 150 })
  Time: string;




  @ManyToOne(() => DoctorEntity, doctor => doctor.mail)
  doctor: DoctorEntity;
}
