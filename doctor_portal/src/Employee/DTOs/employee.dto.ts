import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class EmployeeDto{
    @Length(4,20)
    @IsNotEmpty()
    firstName: string;

    @Length(4,20)
    @IsNotEmpty()
    lastName: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(11,11,{message:"Number must be of 11 Digits"})
    @IsNotEmpty()
    phone:string

    @IsNotEmpty()
    password:string
}