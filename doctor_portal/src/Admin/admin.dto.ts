import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';

export class AddAdminDTO {
  // @IsString({ message: "invalid name" })
  // @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;
  phone: number;
  password: string;
  filenames: string;
  
}

export class AdminLoginDTO {
  @IsEmail({}, { message: "invalid email" })
 email: string;
 password: string;
}

export class SalaryDTO {
  @IsString()
  salary: string;

  code: number;
}
