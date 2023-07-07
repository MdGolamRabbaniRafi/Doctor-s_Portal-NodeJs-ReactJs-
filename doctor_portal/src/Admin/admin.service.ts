import { Injectable } from '@nestjs/common';
import { AddAdminDTO } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>
  ) {}

  async addAdmin(data: AddAdminDTO): Promise<AdminEntity> {
    console.log("Account Created Successfully");
    return this.AdminRepo.save(data);
  }

  async ViewProfile(id: number): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
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
//Doctor section
  async addDoctor(doctor: any): Promise<DoctorEntity> {
    return this.doctorRepo.save(doctor);
  }

  
  

  viewDoctorsByAdmin(id: any): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      where: { id: id },
      relations: {
        doctor: true,
      },
    });
  }

  //Patient Section
  async addPatient(patient: any): Promise<PatientEntity> {
    return this.patientRepo.save(patient);
  }

  
  

  viewPatientsByAdmin(id: any): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      where: { id: id },
      relations: {
        patient: true,
      },
    });
  }

  
}