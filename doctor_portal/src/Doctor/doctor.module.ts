import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './Doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, AppointmentEntity])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
