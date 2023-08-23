import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './Doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { NotificationEntity } from './Notification.entity';
import { ArticleEntity } from './article.entity';
import { ReferEntity } from './refer.entity';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { FileEntity } from './file.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerEntity } from './mailer.entity';
import { AdminEntity } from 'src/Admin/admin.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dreamlessboyrafi7@gmail.com',
          pass: 'zcqebaxjhtjovunk',
        },
      },
    }),
    TypeOrmModule.forFeature([
      DoctorEntity,
      AppointmentEntity,
      SalaryEntity,
      NotificationEntity,
      ArticleEntity,
      ReferEntity,
      PatientEntity,
      FileEntity,
      MailerEntity,
      AdminEntity,
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
