import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAdminDTO, AdminLoginDTO } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { PmailEntity } from 'src/Patient/PatientMail.entity';
import { MailerService } from '@nestjs-modules/mailer/dist';
import * as bcrypt from 'bcrypt';
import { EmailDTO } from './email.dto';
import { NoticeEntity } from './noticeBoard.entity';

@Injectable()
export class AdminService {
  signupp(mydata: AddAdminDTO) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>,
    @InjectRepository(PmailEntity)
    private pmailRepo: Repository<PmailEntity>,
    @InjectRepository(NoticeEntity)
    private noticeRepo: Repository<NoticeEntity>,

    private mailerService: MailerService
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

  async signup(data: AddAdminDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password,salt);
   return this.AdminRepo.save(data);
}

async signIn(data: AdminLoginDTO) {
  const userdata= await this.AdminRepo.findOneBy({email:data.email});
const match:boolean = await bcrypt.compare(data.password, userdata.password);
return match;

}

//Email 
// async mailPatient(mail: PmailEntity, subject: string, text: string): Promise<PmailEntity> {
//   return this.pmailRepo.save({
//     email: mail.email,
//     subject,
//     message: mail.message,
//   });
// }

async mailPatient(pmail: any): Promise<PmailEntity> {
  return this.pmailRepo.save(pmail);
}

async emailSending(clientdata: { email: any; subject: any; text: any; }) {
  return await this.mailerService.sendMail({
    to: clientdata.email,
    subject: clientdata.subject,
    text: clientdata.text,
  });
}
//Notice Board

async addNotice(notice: any): Promise<NoticeEntity> {
  return this.noticeRepo.save(notice);
}



//Doctor section
  async addDoctor(doctor: any): Promise<DoctorEntity> {
    return this.doctorRepo.save(doctor);
  }

  async getAllDoctor(): Promise<DoctorEntity[]> {
    return this.doctorRepo.find({ select: ['id', 'name', 'email'] });
}

async getDoctorById(id: number): Promise<DoctorEntity> {
  return this.doctorRepo.findOne({ where: { id },
    select: ['id', 'name', 'email'], });
}

async viewDoctorsByAdmin(id: any): Promise<AdminEntity[]> {
  return this.AdminRepo.createQueryBuilder('admin')
    .leftJoinAndSelect('admin.doctor', 'doctor')
    .select(['admin.id', 'admin.name', 'admin.email'])
    .addSelect(['doctor.id', 'doctor.name', 'doctor.email'])
    .where('admin.id = :id', { id })
    .getMany();
}

  async deleteAllDoctors(): Promise<{ message: string }> {
    const deleteResult = await this.doctorRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All doctors removed successfully' };
    } else {
      return { message: 'No doctors to remove' };
    }
  }
  
  
  async deleteOneDoctor(Id: number): Promise<{ message: string }> {
    const doctor = await this.doctorRepo.findOne({
      where: { id: Id },
    });
    
    if (!doctor) {
      throw new NotFoundException('doctor not found');
    }
  
    await this.doctorRepo.remove(doctor);
    return { message: 'Doctor removed successfully' };
  }

  async updateDoctorById(id: number, data: Partial<DoctorEntity>, name: string): Promise<{ message: string; updatedDoctor: DoctorEntity }> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  
    const updatedDoctor = Object.assign(doctor, data);
    const savedDoctor = await this.patientRepo.save(updatedDoctor);
    
    return { message: `Doctor named ${name} of ID number ${id} updated successfully`, updatedDoctor: savedDoctor };
  }



  //Patient Section
  async addPatient(patient: any): Promise<PatientEntity> {
    return this.patientRepo.save(patient);
  }

  async getAllPatient(): Promise<PatientEntity[]> {
    return this.patientRepo.find({ select: ['id', 'name', 'email', 'diagonized'] });
}

async getPatientById(id: number): Promise<PatientEntity> {
  return this.patientRepo.findOne({ 
    where: { id },
    select: ['id', 'name', 'email', 'diagonized'],
  });
}




  
async viewPatientsByAdmin(id: any): Promise<AdminEntity[]> {
  return this.AdminRepo.createQueryBuilder('admin')
    .leftJoinAndSelect('admin.patient', 'patient')
    .select(['admin.id', 'admin.name', 'admin.email'])
    .addSelect(['patient.id', 'patient.name', 'patient.email', 'patient.diagonized'])
    .where('admin.id = :id', { id })
    .getMany();
}


  async deleteAllPatients(): Promise<{ message: string }> {
    const deleteResult = await this.patientRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All patients deleted successfully' };
    } else {
      return { message: 'No patients found' };
    }
  }
  
  
  async deleteOnePatient(Id: number): Promise<{ message: string }> {
    const patient = await this.patientRepo.findOne({
      where: { id: Id },
    });
    
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    await this.patientRepo.remove(patient);
    return { message: 'Patient deleted successfully' };
  }

  async updatePatientById(id: number, data: Partial<PatientEntity>, name: string): Promise<{ message: string; updatedPatient: PatientEntity }> {
    const patient = await this.patientRepo.findOne({ where: { id } });
    
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    const updatedPatient = Object.assign(patient, data);
    const savedPatient = await this.patientRepo.save(updatedPatient);
    
    return { message: `Patient named ${name} of ID number ${id} updated successfully`, updatedPatient: savedPatient };
  }
  
  

  
}