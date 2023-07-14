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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorEntity,
      AppointmentEntity,
      SalaryEntity,
      NotificationEntity,
      ArticleEntity,
      ReferEntity,
      PatientEntity,
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
