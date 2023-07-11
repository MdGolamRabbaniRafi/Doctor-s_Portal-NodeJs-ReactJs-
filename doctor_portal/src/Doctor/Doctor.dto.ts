import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { AdminEntity } from 'src/Admin/admin.entity';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { DoctorModule } from './doctor.module';


export class AddDocotorDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  id: number;
}

export class DoctorInfo {
  name: string;
  email: string;
}

export class Article {
  @IsEmpty({ message: "invalid name" })
  name: string;

  @IsEmpty({ message: "invalid Link" })
  Link: string;
}

export class Refer {
  @IsEmpty({ message: "invalid name" })
  ReferName: string;

  @IsEmpty({ message: "invalid ID" })
  ReferID: Number;
}

@Entity("Doctor")
export class DoctorEntity {
  @Column()
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @Column()
  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Column()
  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  appointment: AppointmentEntity[];
  @ManyToOne(() => AdminEntity, admin => admin.doctor)
  admin: AdminEntity;
  @OneToMany(() => SalaryEntity, salary => salary.doctor)
  salary: number;

}
