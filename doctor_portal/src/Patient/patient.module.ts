import { Module } from '@nestjs/common';
import { PatientController } from './Patient.controller';
import { PatientService } from './Patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './Patient.dto';
// import { AppointmentEntity } from './appointment.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
