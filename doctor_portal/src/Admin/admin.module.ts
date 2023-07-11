import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { MailerModule } from '@nestjs-modules/mailer';
import { NoticeEntity } from './noticeBoard.entity';
import { SalaryEntity } from './salary.entity';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';

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
  }),TypeOrmModule.forFeature([AdminEntity, DoctorEntity, PatientEntity,  NoticeEntity, SalaryEntity, AppointmentEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}