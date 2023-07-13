import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './Doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { SalaryEntity } from 'src/Admin/salary.entity';
import * as bcrypt from 'bcrypt';
<<<<<<< HEAD
import { NotificationEntity } from './Notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, AppointmentEntity, SalaryEntity,NotificationEntity])],
=======


@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, AppointmentEntity, SalaryEntity])],
>>>>>>> 3443213db0733a95a4242b6f05ffe0d552121317
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
