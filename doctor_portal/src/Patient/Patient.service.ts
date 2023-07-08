import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupPatientDTO, PatientEntity,  } from './Patient.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
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

}


 


<<<<<<< HEAD
=======

>>>>>>> 07dfa9ccd7062b7689c3d9b38b42cb848f57c158
