import { Injectable } from '@nestjs/common';
import { SignupPatientDTO, PatientEntity,  } from './Patient.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
// import { AppointmentEntity } from './appointment.entitiy';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private PatientRepo: Repository<PatientEntity>,
    // @InjectRepository(AppointmentEntity)
    // private appointmentRepo: Repository<AppointmentEntity>
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

  // Edit(id: number, patients: AddPatientDTO[], updatePatient: AddPatientDTO): object {
  //   console.log(patients);
  //   for (let i = 0; i < patients.length; i++) {
  //     if (patients[i].id == id) {
  //       patients[i] = updatePatient;
  //       console.log('Information Updated');
  //       console.log(patients[i]);
  //       return patients[i];
  //     }
  //   }
  // }

  // Searching(id: number, patients: AddPatientDTO[]): object {
  //   for (let i = 0; i < patients.length; i++) {
  //     if (patients[i].id == id) {
  //       console.log("Founded");
  //       return patients[i];
  //     }
  //   }
  // }

  // ChangePassword(id: number, patients: AddPatientDTO[], updatePatient: AddPatientDTO): object {
  //   console.log(patients);
  //   for (let i = 0; i < patients.length; i++) {
  //     if (patients[i].id === id) {
  //       patients[i] = updatePatient;
  //       console.log('Password Change Successfully');
  //       console.log(patients[i]);
  //       return patients[i];
  //     }
  //   }
  // }

  // addArticle(data: Article): object {
  //   console.log("Article Posted Successfully");
  //   return data;
  // }

  // Refer(data: Refer): object {
  //   console.log("Refered Successfully");
  //   return data;
  // }

  // async addAppointment(appointment: any): Promise<AppointmentEntity> {
  //   return this.appointmentRepo.save(appointment);
  // }

  // viewAppointment(id: any): Promise<PatientEntity[]> {
  //   return this.PatientRepo.find({
  //     where: { id: id },
  //     relations: {
  //       appointment: true,
  //     },
  //   });
  // }

//   async deleteAllAppointments(doctorId: number): Promise<void> {
//     const appointments = await this.appointmentRepo.find({
//       where: { doctor: { id: doctorId } },
//     });
//     await this.appointmentRepo.remove(appointments);
//   }

//   async deleteOneAppointment(doctorId: number, serial: number): Promise<void> {
//     const appointment = await this.appointmentRepo.findOne({
//       where: { Serial: serial, doctor: { id: doctorId } },
//     });
//     await this.appointmentRepo.remove(appointment);
//   }

//   async updateAppointment(doctorId: number, serial: number, data: AppointmentEntity): Promise<AppointmentEntity | null> {
//     const appointment = await this.appointmentRepo.findOne({
//       where: { Serial: serial, doctor: { id: doctorId } },
//     });
//     if (!appointment) {
//       return null;
//     }
//     await this.appointmentRepo.update(serial, data);
//     return this.appointmentRepo.findOne({
//       where: { Serial: serial }
//     });
//   }
// }
}


