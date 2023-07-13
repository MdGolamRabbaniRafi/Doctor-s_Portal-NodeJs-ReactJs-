import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './Doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { SalaryEntity } from 'src/Admin/salary.entity';
import * as bcrypt from 'bcrypt';
import { NotificationEntity } from './Notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, AppointmentEntity, SalaryEntity,NotificationEntity])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
