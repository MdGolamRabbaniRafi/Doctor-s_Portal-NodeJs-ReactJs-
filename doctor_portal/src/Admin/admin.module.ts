import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { PmailEntity } from 'src/Patient/PatientMail.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [ MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'emonsingha209@gmail.com',
        pass: 'pjwvkevgjvozlose',
      },
    },
  }),TypeOrmModule.forFeature([AdminEntity, DoctorEntity, PatientEntity, PmailEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}