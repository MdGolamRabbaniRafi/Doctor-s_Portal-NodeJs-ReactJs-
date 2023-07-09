import { Module } from '@nestjs/common';
import { PatientController } from './Patient.controller';
import { PatientService } from './Patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './Patient.dto';
import { PmailEntity } from './PatientMail.entity';
// import { AppointmentEntity } from './appointment.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, PmailEntity])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
