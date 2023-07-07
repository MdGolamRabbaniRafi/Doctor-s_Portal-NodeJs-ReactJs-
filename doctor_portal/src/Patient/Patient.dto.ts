import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { AdminEntity } from 'src/Admin/admin.entity';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne } from 'typeorm';


export class SignupPatientDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;

  @IsString({ message: "invalid email" })
  diagonized: string;

  @Matches(/^\d{8}$/, { message: 'Password must be 8 digits long.' })
  password: string;

  id: number;
}


export class PatientInfo {
  name: string;
  email: string;
}

// export class Article {
//   @IsEmpty({ message: "invalid name" })
//   name: string;

//   @IsEmpty({ message: "invalid Link" })
//   Link: string;
// }

// export class Refer {
//   @IsEmpty({ message: "invalid name" })
//   ReferName: string;

//   @IsEmpty({ message: "invalid ID" })
//   ReferID: Number;
// }

@Entity("Patient")
export class PatientEntity {
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

  @Column()
  @IsString({ message: "invalid input " })
  diagonized: string;

  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  // appointment: AppointmentEntity[];

  @ManyToOne(() => AdminEntity, admin => admin.patient)
  admin: AdminEntity;


}

