import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailDTO {
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  to: string;

  @IsNotEmpty({ message: 'This item must be fill up' })
  subject: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @MaxLength(2000, { message: 'Cannot write more than 2000 words' })
  text: string;
}