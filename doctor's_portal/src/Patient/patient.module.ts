import { Module } from '@nestjs/common';
import { PatientController } from './Patient.controller';
import { PatientService } from './Patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './Patient.dto';
import { DoctorEntity } from "src/Doctor/Doctor.dto";
import { AppointmentEntity } from "src/Doctor/appointment.entitiy";
import { PaymentEntity } from './Payment.entity';
import { MailerService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { FeedbackEntity } from './feedback.entity';
import { MedicineEntity } from './medicine.entity';
import { TestEntity } from './test.entity';
import { NotificationEntity } from './notification.entity';
import { PatientProfileEntity } from './PatientProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity,DoctorEntity,AppointmentEntity,PaymentEntity,FeedbackEntity,PatientProfileEntity,MedicineEntity,TestEntity,NotificationEntity])],
  controllers: [PatientController],
  providers: [PatientService, MailerService],
})

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'shohanmehedi18@gmail.com',
          pass: 'hgotlskmudtgsmmb',
        },
      },
    }),
  ]
 
})
export class PatientModule {}



