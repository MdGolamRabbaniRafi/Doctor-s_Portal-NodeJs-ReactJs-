import { IsString, Matches, IsEmail, IsEmpty, isString } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { AdminEntity } from 'src/Admin/admin.entity';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { NotificationEntity } from './Notification.entity';
import { ArticleEntity } from './article.entity';
import { ReferEntity } from './refer.entity';
import { PaymentEntity } from 'src/Patient/Payment.entity';
import { FileEntity } from './file.entity';
import { MailerEntity } from './mailer.entity';

export class AddDocotorDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z ]+$/, { message: "Enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'Password must be at least 8 characters, contain at least 1 special character, and have at least 1 capital letter' })
  password: string;
  Gender: string;
  Degree: string;
  Blood_group: string;
  User: string;


  id: number; 
}

export class DoctorInfo {
  name: string;
  email: string;
}





@Entity("Doctor")
export class DoctorEntity {
  @Column()

  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column()
  Gender: string;
  @Column()
  Degree: string;
  @Column()
  Blood_group: string;
  @Column()
  User: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  appointment: AppointmentEntity[];

    @ManyToOne(() => AdminEntity, admin => admin.doctor)
  admin: AdminEntity;

  // @OneToMany(() => PaymentEntity, payment => payment.doctor)
  // payment: PaymentEntity[];
  @OneToMany(() => SalaryEntity, salary => salary.doctor)
salary: SalaryEntity[];
@OneToMany(() => NotificationEntity, notification => notification.doctor)
notification: NotificationEntity[];
@OneToMany(() => ArticleEntity, article => article.doctor)
article: DoctorEntity[];
@OneToMany(() => ReferEntity, refer => refer.doctor)
refer: DoctorEntity[];
@OneToOne(() => FileEntity, files => files.doctor)
files: DoctorEntity[];
@OneToMany(() => MailerEntity, mail => mail.doctor)
mail: DoctorEntity[];
}
export class LoginDTO {
  @IsEmail({}, { message: "invalid email" })
 email: string;
 password: string;
}

