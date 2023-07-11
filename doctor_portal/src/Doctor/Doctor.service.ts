import { Injectable } from '@nestjs/common';
import { AddDocotorDTO, Article, DoctorEntity, Refer } from './Doctor.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { DoctorModule } from './doctor.module';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private DoctorRepo: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>
  ) {}

  async addDoctor(data: AddDocotorDTO): Promise<DoctorEntity> {
    console.log("Account Created Successfully");
    return this.DoctorRepo.save(data);
  }

  async ViewProfile(id: number): Promise<DoctorEntity[]> {
    return this.DoctorRepo.find({
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

  Edit(id: number, doctors: AddDocotorDTO[], updateDoctor: AddDocotorDTO): object {
    console.log(doctors);
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].id == id) {
        doctors[i] = updateDoctor;
        console.log('Information Updated');
        console.log(doctors[i]);
        return doctors[i];
      }
    }
  }

  Searching(id: number, doctors: AddDocotorDTO[]): object {
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].id == id) {
        console.log("Founded");
        return doctors[i];
      }
    }
  }

  ChangePassword(id: number, doctors: AddDocotorDTO[], updateDoctor: AddDocotorDTO): object {
    console.log(doctors);
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].id === id) {
        doctors[i] = updateDoctor;
        console.log('Password Change Successfully');
        console.log(doctors[i]);
        return doctors[i];
      }
    }
  }

  addArticle(data: Article): object {
    console.log("Article Posted Successfully");
    return data;
  }

  Refer(data: Refer): object {
    console.log("Refered Successfully");
    return data;
  }

  async addAppointment(appointment: any): Promise<AppointmentEntity> {
    return this.appointmentRepo.save(appointment);
  }

  viewAppointment(id: any): Promise<DoctorEntity[]> {
    return this.DoctorRepo.find({
      where: { id: id },
      relations: {
        appointment: true,
      },
    });
  }

  async deleteAllAppointments(doctorId: number): Promise<void> {
    const appointments = await this.appointmentRepo.find({
      where: { doctor: { id: doctorId } },
    });
    await this.appointmentRepo.remove(appointments);
  }

  async deleteOneAppointment(doctorId: number, serial: number): Promise<void> {
    const appointment = await this.appointmentRepo.findOne({
      where: { Serial: serial, doctor: { id: doctorId } },
    });
    await this.appointmentRepo.remove(appointment);
  }

  async updateAppointment(doctorId: number, serial: number, data: AppointmentEntity): Promise<AppointmentEntity | null> {
    const appointment = await this.appointmentRepo.findOne({
      where: { Serial: serial, doctor: { id: doctorId } },
    });
    if (!appointment) {
      return null;
    }
    await this.appointmentRepo.update(serial, data);
    return this.appointmentRepo.findOne({
      where: { Serial: serial }
    });
  }
}
