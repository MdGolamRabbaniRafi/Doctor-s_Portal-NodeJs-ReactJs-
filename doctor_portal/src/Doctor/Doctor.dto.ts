import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { AdminEntity } from 'src/Admin/admin.entity';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { DoctorModule } from './doctor.module';
<<<<<<< HEAD
import { NotificationEntity } from './Notification.entity';
=======
>>>>>>> 3443213db0733a95a4242b6f05ffe0d552121317


export class AddDocotorDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;
  @Matches(/^\d{8,}$/, { message: 'Password must be at least 8 digits long.' })
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

  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  appointment: AppointmentEntity[];

  @ManyToOne(() => AdminEntity, admin => admin.doctor)
  admin: AdminEntity;

  @OneToMany(() => SalaryEntity, salary => salary.doctor)
salary: SalaryEntity[];
<<<<<<< HEAD
@OneToMany(() => NotificationEntity, notification => notification.doctor)
notification: DoctorEntity[];

}
export class LoginDTO {
  @IsEmail({}, { message: "invalid email" })
 email: string;
 password: string;
=======

>>>>>>> 3443213db0733a95a4242b6f05ffe0d552121317
}

