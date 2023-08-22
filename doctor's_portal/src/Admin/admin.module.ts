import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { MailerModule } from '@nestjs-modules/mailer';
import { NoticeEntity } from './noticeBoard.entity';
import { SalaryEntity } from './salary.entity';
import { MailerService } from './mailer.service';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { NotificationEntity } from './notification.entity';
import { ProfileEntity } from './profile.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mirfaris79@gmail.com',
          pass: 'dxyekyeighltfntb',
        },
      },
    }),
    TypeOrmModule.forFeature([
      AdminEntity,
      DoctorEntity,
      PatientEntity,
      NoticeEntity,
      SalaryEntity,
      AppointmentEntity,
      NotificationEntity,
      ProfileEntity
      
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, MailerService], 
})
export class AdminModule {}
