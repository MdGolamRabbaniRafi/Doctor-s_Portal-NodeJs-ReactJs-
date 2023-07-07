import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, DoctorEntity, PatientEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}