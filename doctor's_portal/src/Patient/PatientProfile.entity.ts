import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./Patient.dto";

@Entity("Patient_Profile")
export class PatientProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  education: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  experience: string;


  @OneToOne(() => PatientEntity, Patient => Patient.Profile)
  @JoinColumn()
  patient: PatientEntity;
}

