import { Injectable } from '@nestjs/common';
import { AddAdminDTO } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/doctor.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>
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

  async addDoctor(doctor: any): Promise<DoctorEntity> {
    return this.doctorRepo.save(doctor);
  }

  
  

  viewDoctor(id: any): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      where: { id: id },
      relations: {
        doctor: true,
      },
    });
  }

  
}