import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesEntity } from './Entites/employee.entity';
import { ReportsEintiy } from './Entites/report.entity';
import { EmployeeController } from './Controllers/employee.controller';
import { ReportController } from './Controllers/report.controller';
import { EmployeeService } from './Services/employee.service';
import { ReportService } from './Services/report.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './Services/email.service';
import { DoctorService } from 'src/Doctor/Doctor.service';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { NotificationEntity } from 'src/Admin/notification.entity';
import { ArticleEntity } from 'src/Doctor/article.entity';
import { ReferEntity } from 'src/Doctor/refer.entity';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { FileEntity } from 'src/Doctor/file.entity';
import { MailerEntity } from 'src/Doctor/mailer.entity';
import { AdminEntity } from 'src/Admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeesEntity,
      ReportsEintiy,
      AppointmentEntity,
      DoctorEntity,
      FileEntity,
      SalaryEntity,
      NotificationEntity,
      ArticleEntity,
      ReferEntity,
      PatientEntity,
      MailerEntity,
      AdminEntity
    ]),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'abcdhealthcare24@gmail.com',
          pass: 'edmhnqgrzwkdyfik',
        },
      },
    }),
  ],
  controllers: [EmployeeController, ReportController],
  providers: [EmployeeService, EmailService, ReportService, DoctorService],
})
export class EmployeeModule {}
