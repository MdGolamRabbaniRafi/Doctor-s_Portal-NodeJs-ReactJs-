import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupPatientDTO, PatientEntity,  } from './Patient.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';

@Injectable()
export class PatientService {
  doctorRepo: any;
  appointmentRepo: any;
  constructor(
    @InjectRepository(PatientEntity)
    private PatientRepo: Repository<PatientEntity>,
  
  ) {}

  async addPatient(data): Promise<PatientEntity> {
    console.log("Account Created Successfully");
    return this.PatientRepo.save(data);
  }

  async SeeProfile(id: number): Promise<PatientEntity[]> {
    return this.PatientRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: true
      },
      where: {
        id: id,
      }
    });
  }
  async submitFeedback(id: number, feedback: string): Promise<PatientEntity> {
    const patient = await this.PatientRepo.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    patient.feedback = feedback;
    return this.PatientRepo.save(patient);
  }


async orderMedicine(id: number, medicineOrder: string): Promise<PatientEntity> {
  const patient = await this.PatientRepo.findOne({ where: { id } });
  if (!patient) {
    throw new NotFoundException('Patient not found');
  }

  patient.medicineOrder = medicineOrder;
  return this.PatientRepo.save(patient);
}

async editProfile(id: number, updatedPatientData: Partial<PatientEntity>): Promise<PatientEntity> {
  const patient = await this.PatientRepo.findOne({ where: { id } });
  if (!patient) {
    throw new NotFoundException('Patient not found');
  }

  Object.assign(patient, updatedPatientData);

  return this.PatientRepo.save(patient);
}
async getDoctorById(id: number): Promise<DoctorEntity> {
  return this.doctorRepo.findOne({ 
    where: { id },
    select: ['id', 'name', 'email', ],
  });
}
async addAppointment(appointment: any): Promise<AppointmentEntity> {
  return this.appointmentRepo.save(appointment);
}
async deleteAppointment(Serial: number): Promise<{ message: string }> {
  const app = await this.appointmentRepo.findOne({
    where: { Serial: Serial },
  });
  
  if (!app) {
    throw new NotFoundException('Appointment not found');
  }

  await this.appointmentRepo.remove(app);
  return { message: `Appointment Serial ${Serial} removed successfully`};
}


}


 

