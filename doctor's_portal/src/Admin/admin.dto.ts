import { IsString, IsEmail, Matches } from 'class-validator';

export class AddAdminDTO {
  @IsString({ message: 'Invalid name' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Enter a proper name' })
  name: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  // phone: number;
  password: string;
  Gender: string;
  Degree: string;
  Blood_group: string;
  User:string;
  currentPassword: string;

  // filenames: string;
}

export class AdminLoginDTO {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  password: string;
}

export class SalaryDTO {
  @IsString()
  salary: string;

  code: number;
}

export class NoticeDTO {
  @IsString({ message: 'Invalid subject' })
  subject: string;

  @IsString({ message: 'Invalid message' })
  message: string;

  postedTime: any;
  sl: number;
}

export class ProfileDTO {
  id: string;

  @IsString({ message: 'Invalid message' })
  bio: string;

  location: string;

  website: string;
  education: string;
  experience: string
  filenames: string;
}


