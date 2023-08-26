import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Session } from '@nestjs/common';
import { AddAdminDTO, AdminLoginDTO, NoticeDTO, ProfileDTO, SalaryDTO } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity} from './admin.entity';
import { AddDocotorDTO, DoctorEntity } from '../Doctor/doctor.dto';
import { PatientEntity, SignupPatientDTO } from 'src/Patient/Patient.dto';
import * as bcrypt from 'bcrypt';
import { NoticeEntity } from './noticeBoard.entity';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { SalaryEntity } from './salary.entity';
import { MailerService } from './mailer.service';
import { NotificationEntity } from './notification.entity';
import { CurrentDate, CurrentTime } from 'src/Doctor/current.date';
import { Response } from 'express';
import path, { join } from 'path';
import { ProfileEntity } from './profile.entity';



@Injectable()
export class AdminService {

  
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>,
    @InjectRepository(AppointmentEntity)
     private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(NoticeEntity)
    private noticeRepo: Repository<NoticeEntity>,
    @InjectRepository(SalaryEntity)
    private salaryRepo: Repository<SalaryEntity>,
    @InjectRepository(NotificationEntity)
    private notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    private mailerService: MailerService
  ) {}


  // async ViewPersonalInfo(email: string): Promise<AdminEntity[]> {
  //   const visit = await this.AdminRepo.find({
  //     select: {
  //       name: true,
  //       email: true,
  //       id: true,
  //       password: false,
  //       // filenames: false,
  //       // phone: true
  //       // Gender: true,
  //       // Degree: true,
  //       // Blood_group: true


  //     },
  //     where: {
  //       email: email,
        
  //     },
  //     relations: ['profile']
  //   });
  
  //   const admin = visit[0];
  //   const notiFication: NotificationEntity = new NotificationEntity();
  //   notiFication.admin = admin; 
  //   notiFication.Message = "Profile Visited";
  //   const currentDate: CurrentDate = new CurrentDate();
  //   const currentTime: CurrentTime = new CurrentTime();
  
  //   notiFication.date = currentDate.getCurrentDate();
  //   notiFication.time = currentTime.getCurrentTime();
  //   await this.notificationRepo.save(notiFication);
  //   return visit;
  // }


  async updateProfile(email: string, profileData: ProfileDTO): Promise<ProfileEntity> {
    const admin = await this.AdminRepo.findOne({ where: { email }, relations: ['profile'] });
  
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
  
    const { website, experience, education, filenames } = profileData;
  
    admin.profile.website = website;
    admin.profile.experience = experience;
    admin.profile.education = education;
    admin.profile.filenames = filenames;

  
    try {
      await this.profileRepo.save(admin.profile);
      return admin.profile;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update profile');
    }
  }

  async updatePass(email: string, updatePass: AddAdminDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    updatePass.password = await bcrypt.hash(updatePass.password, salt);
    
    const updateResult = await this.AdminRepo.update({ email }, updatePass);
    const admin = await this.AdminRepo.findOne({
      where: {
        email: email,
      },
    });
    
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.admin = admin;
    notiFication.Message = "Account Edited Successfully";
    
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    
    await this.notificationRepo.save(notiFication);
    
    return admin;
    
  }
  


  async ViewMyProfile(email: string): Promise<{ admin: AdminEntity }> {
    const admin = await this.AdminRepo.findOne({ where: { email }, relations: ['profile'] });
  
    if (!admin) {
      throw new NotFoundException('Admin profile not found');
    }
  
    admin.password = undefined;
  
    return { admin };
  }


  
  
  
  

  async addProfile(profileData: ProfileEntity, email: string): Promise<ProfileEntity> {
    const admin = await this.AdminRepo.findOne({ where: { email } });
  
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
  
    const profile = this.profileRepo.create(profileData);
    admin.profile = profile; // Set the profile reference in admin
  
    await this.AdminRepo.save(admin); // Save the admin to update the relationship
  
    return this.profileRepo.save(profile);
  }
  

  async getProfilePictureFilename(email: string): Promise<string> {
    const admin = await this.AdminRepo
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.profile', 'profile')
      .where('admin.email = :email', { email })
      .getOne();
  
    if (admin && admin.profile && admin.profile.filenames) {
      return admin.profile.filenames;
    }
  
    throw new Error('Profile picture not found');
  }
  
  
  

  // async signup(data: AddAdminDTO): Promise<AdminEntity> {
  //   const salt = await bcrypt.genSalt();
  //   data.password = await bcrypt.hash(data.password,salt);
  //   try {
  //     const savedAdmin = await this.AdminRepo.save(data);
  
  //     const notiFication: NotificationEntity = new NotificationEntity();
  //     notiFication.admin = savedAdmin; 
  //     notiFication.Message = "Account Created Successfully";
  //     const currentDate: CurrentDate = new CurrentDate();
  //     const currentTime: CurrentTime = new CurrentTime();
  
  //     notiFication.date = currentDate.getCurrentDate();
  //     notiFication.time = currentTime.getCurrentTime();
  //     await this.notificationRepo.save(notiFication);
  
  //     return savedAdmin;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }}

  async signup(data: AddAdminDTO): Promise<string> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    console.log(data.password);
    console.log("Account Created Successfully");
    try {
      const savedAdmin = await this.AdminRepo.save(data);
  
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.admin = savedAdmin; 
      notiFication.Message = "Account Created Successfully";
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
  
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      await this.notificationRepo.save(notiFication);
  
      return "Registration successful";
    } catch (error) {
      console.error(error);
      return "Registration failed";

    }
  }



    
  

  async signIn(data: AdminLoginDTO): Promise<boolean> {
    const userData = await this.AdminRepo.findOneBy({ email: data.email });
  
    if (userData !== undefined) {
      const match: boolean = await bcrypt.compare(data.password, userData.password);
      const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Your logged in a device";
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.admin = userData;
    await this.notificationRepo.save(notiFication);
      return match;
    }
  
    return false;
  }
    
  
    async Logout(@Session() session, email: string) {
      const Search = await this.AdminRepo.find({
        select: {
          name: true,
          id: true,
          password: false
        },
        where: {
          email: email,
        }
      });
    
      const admin = Search[0];
    
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.admin = admin;
      notiFication.Message = "Logged Out";
    
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
    
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
    
      await this.notificationRepo.save(notiFication);
    
      session.destroy();
      return "Logout Successfully";
    }

// async getimagebyadminid(adminid:number, email: string) {
//   const mydata:AddAdminDTO =await this.AdminRepo.findOneBy({ id:adminid});
//   console.log(mydata);
//   return  mydata.filenames;
//       }

 async viewNotification(email: string): Promise<NotificationEntity[]> {
        const doctor = await this.AdminRepo.findOne({
          where: {
            email: email,
          },
        });
      
        const notifications = await this.notificationRepo.find({
          where: {
            admin: doctor,
          },
        });
      
        return notifications;
      }      

  // async ViewMyNotification(email: string): Promise<{ admin: AdminEntity }> {
  //   const admin = await this.AdminRepo.findOne({ where: { email }, relations: ['notification'] });
  
  //   if (!admin) {
  //     throw new NotFoundException('Admin notification not found');
  //   }
  
  //   admin.password = undefined;
  //   admin.email = undefined;
    
  
  //   return { admin };
  // }

  async deleteAllNotification(email: string): Promise<{ message: string }> {
    const admin = await this.AdminRepo.findOne({ where: { email } });
  
    if (!admin) {
      return { message: 'Admin not found' };
    }
  
    const deleteResult = await this.notificationRepo.delete({ admin });
  
    if (deleteResult.affected > 0) {
      return { message: 'All notifications removed successfully' };
    } else {
      return { message: 'No notifications to remove' };
    }
  }
  
  


//Dashboard
getDashboard():any {
  return "Admin Dashboard";
}

//Email 

async sendEmail(to: string, subject: string, text: string): Promise<{ status: string; message: string }> {
  await this.mailerService.sendMail(to, subject, text);
  return { status: 'success', message: 'Email sent successfully' };
}


//Notice Board

async addNotice(data: NoticeDTO, email: string): Promise<NoticeEntity> {
  const admin = await this.AdminRepo.findOne({
    where: { email: email },
  });

  if (!data.subject) {
    throw new Error('Subject is required.'); 
  }
  if (!data.message) {
    throw new BadRequestException(' Write something in message');
  }

  const addNotice: NoticeEntity = new NoticeEntity();
  addNotice.subject = data.subject;
  addNotice.message = data.message;
  addNotice.admin = admin;

  const savedNotice = await this.noticeRepo.save(addNotice);
  console.log("Notice added successfully");

  const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.admin = admin;
    notiFication.Message = "New notice posted";
    
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    
    await this.notificationRepo.save(notiFication);

  return savedNotice;
}



async getAllNotice(): Promise<NoticeEntity[]|string> {

  const notices = await this.noticeRepo.find({
    select: ['sl', 'subject', 'message', 'postedTime'],
    relations: ['admin'],
  });

  if (notices.length === 0) {
    return "Notice not found"
  }

  const updatedNotices: NoticeEntity[] = notices.map(notice => {
    const updatedNotice = { ...notice };
    if (updatedNotice.admin) {
      updatedNotice.message = `Posted by ${updatedNotice.admin.name}: ${updatedNotice.message}`;
      delete updatedNotice.admin.password;
      delete updatedNotice.admin.email;
    }
    return updatedNotice;
  });

  return updatedNotices;
}

// async getAllNotice(id: any): Promise<NoticeEntity[]> {
//   const notices = await this.noticeRepo.find({
//     where: id ,
//     select: ['sl', 'subject', 'message', 'postedTime'],
//     relations: ['admin'],
//   });

//   if (notices.length === 0) {
//     return [{ sl: null, subject: 'No Notice Found', message: 'No notice available at the moment', postedTime: null, admin: null }];
//   }

//   const updatedNotices: NoticeEntity[] = notices.map(notice => {
//     const updatedNotice = { ...notice };
//     if (updatedNotice.admin) {
//       updatedNotice.message = `Posted by ${updatedNotice.admin.name}: ${updatedNotice.message}`;
//       delete updatedNotice.admin.password;
//       delete updatedNotice.admin.email;
//     }
//     return updatedNotice;
//   });

//   return updatedNotices;
// }


async viewNoticeByAdmin(id: any): Promise<AdminEntity[]> {
  return this.AdminRepo.createQueryBuilder('admin')
    .leftJoinAndSelect('admin.notice', 'notice')
    .select(['admin.id', 'admin.name'])
    .addSelect(['notice.sl', 'notice.subject', 'notice.message', 'notice.postedTime'])
    .where('admin.id = :id', { id })
    .getMany();
}


async deleteAllNotice(): Promise<{ message: string }> {
  const deleteResult = await this.noticeRepo.delete({});
  
  if (deleteResult.affected > 0) {
    return { message: 'All notices removed successfully' };
  } else {
    return { message: 'No notice to remove' };
  }
}

async deleteOneNotice(SL: number): Promise<{ message: string }> {
  const notice = await this.noticeRepo.findOne({
    where: { sl: SL },
  });
  
  if (!notice) {
    throw new NotFoundException('Notice not found');
  }

  await this.noticeRepo.remove(notice);
  return { message: 'Notice removed successfully' };
}








//Doctor section

async addDoctor(data: AddDocotorDTO, email: string): Promise<DoctorEntity> {
  const admin = await this.AdminRepo.findOne({
    where: { email: email },
  });

  if (!data.name) {
    throw new Error('Name is required.'); 
  }
  if (!data.email) {
    throw new BadRequestException('Email is required');
  }
  if (!data.password) {
    throw new BadRequestException('Password is required');
  }
  if (!data.Degree) {
    throw new BadRequestException('Degree is required');
  }
  if (!data.Blood_group) {
    throw new BadRequestException('Blood group is required');
  }
  if (!data.Gender) {
    throw new BadRequestException('Gender is required');
  }
  if (!data.User) {
    throw new BadRequestException('User is required');
  }

  const addDoctor: DoctorEntity = new DoctorEntity();
  addDoctor.name = data.name;
  addDoctor.email = data.email;
  addDoctor.password = data.password; 
  addDoctor.Degree = data.Degree; 
  addDoctor.Blood_group = data.Blood_group; 
  addDoctor.Gender = data.Gender; 
  addDoctor.User = data.User; 


  addDoctor.admin = admin;

  const savedDoctor = await this.doctorRepo.save(addDoctor);
  console.log("Doctor added successfully");

  return savedDoctor;
}



// async getAllDoctors(): Promise<DoctorEntity[]> {
//   const doctors = await this.doctorRepo.find({ relations: ['admin'] });
  
//   doctors.forEach(doctor => {
//     doctor.password = undefined;
//     if (doctor.admin) {
//       doctor.admin.password = undefined;
//       // doctor.admin.filenames = undefined;
//       // doctor.admin.phone = undefined;
//       doctor.admin.email = undefined;
//     }
//   });

//   return doctors;
// }

async getAllDoctors(): Promise<DoctorEntity[]|string> {

  const doctors = await this.doctorRepo.find({
    select: ['name', 'email', 'id', 'Degree'],
    relations: ['admin'],
  });

  if (doctors.length === 0) {
    return "Doctor not found"
  }

  const updatedDoctors: DoctorEntity[] = doctors.map(doctor => {
    const updatedDoctor = { ...doctor };
    if (updatedDoctor.admin) {
      updatedDoctor.name = `${updatedDoctor.name}. Added by admin ${updatedDoctor.admin.name}`;
      delete updatedDoctor.admin.password;
      delete updatedDoctor.admin.email;
    }
    return updatedDoctor;
  });

  return updatedDoctors;
}

async viewDoctorsByAdmin(id: any): Promise<AdminEntity[]> {
  return this.AdminRepo.createQueryBuilder('admin')
    .leftJoinAndSelect('admin.doctor', 'doctor')
    .select(['admin.id', 'admin.name', 'admin.email'])
    .addSelect(['doctor.id', 'doctor.name', 'doctor.email'])
    .where('admin.id = :id', { id })
    .getMany();
}

async getDoctorById(doctorId: number, email: string): Promise<DoctorEntity> {
  const admin = await this.AdminRepo.findOne({ where: { email } });

  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  const doctor = await this.doctorRepo.findOne({
    where: { id: doctorId, admin },
    relations: ['admin'],
  });

  if (!doctor) {
    throw new NotFoundException('Doctor not found');
  }

  doctor.password = undefined;
  if (doctor.admin) {
    doctor.admin.password = undefined;
    // doctor.admin.filenames = undefined;
    // doctor.admin.phone = undefined;
    doctor.admin.email = undefined;
  }

  return doctor;
}



  async deleteAllDoctors(): Promise<{ message: string }> {
    const deleteResult = await this.doctorRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All doctors removed successfully' };
    } else {
      return { message: 'No doctors to remove' };
    }
  }
  
  async deleteDoctorById(id: number): Promise<{ message: string }> {
   
  
    const doctor = await this.doctorRepo.findOne({ where: { id } });
  
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  
    await this.doctorRepo.remove(doctor);
    
    return { message: `Doctor with ID ${id} deleted successfully` };
  }
  

  async updateDoctorById(id: number, data: Partial<DoctorEntity>, name: string): Promise<{ message: string; updatedDoctor: DoctorEntity }> {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  
    const updatedDoctor = Object.assign(doctor, data);
    const savedDoctor = await this.doctorRepo.save(updatedDoctor);
    
    return { message: `Doctor named ${name} of ID number ${id} updated successfully`, updatedDoctor: savedDoctor };
  }



  //Patient Section
  async addPatient(data: SignupPatientDTO, email: string): Promise<PatientEntity> {
    const admin = await this.AdminRepo.findOne({
      where: { email: email },
    });
  
    if (!data.name) {
      throw new Error('Name is required.'); 
    }
    if (!data.email) {
      throw new BadRequestException('Email is required');
    }
    if (!data.password) {
      throw new BadRequestException('Password is required');
    }
    if (!data.Degree) {
      throw new BadRequestException('Degree is required');
    }
    if (!data.Blood_group) {
      throw new BadRequestException('Blood group is required');
    }
    if (!data.Gender) {
      throw new BadRequestException('Gender is required');
    }
    if (!data.User) {
      throw new BadRequestException('User is required');
    }
  
    const addPatients: PatientEntity = new PatientEntity();
    addPatients.name = data.name;
    addPatients.email = data.email;
    addPatients.password = data.password; 
    addPatients.Degree = data.Degree; 
    addPatients.Blood_group = data.Blood_group; 
    addPatients.Gender = data.Gender; 
    addPatients.User = data.User; 
    addPatients.admin = admin;
  
    const savedPatient = await this.patientRepo.save(addPatients);
    console.log("Patient added successfully");
  
    return savedPatient;
  }
  

  async getAllPatient(): Promise<PatientEntity[]|string> {

    const patients = await this.patientRepo.find({
      select: ['name', 'email', 'id', 'Blood_group'],
      relations: ['admin'],
    });
  
    if (patients.length === 0) {
      return "Patient not found"
    }
  
    const updatedPatients: PatientEntity[] = patients.map(patient => {
      const updatedPatient = { ...patient };
      if (updatedPatient.admin) {
        updatedPatient.name = `${updatedPatient.name}. Added by admin ${updatedPatient.admin.name}`;
        delete updatedPatient.admin.password;
        delete updatedPatient.admin.email;
      }
      return updatedPatient;
    });
  
    return updatedPatients;
  }
async getPatientById(id: number): Promise<PatientEntity> {
  return this.patientRepo.findOne({ 
    where: { id },
    select: ['id', 'name', 'email'],
  });
}




  
async viewPatientsByAdmin(id: any): Promise<AdminEntity[]> {
  return this.AdminRepo.createQueryBuilder('admin')
    .leftJoinAndSelect('admin.patient', 'patient')
    .select(['admin.id', 'admin.name', 'admin.email'])
    .addSelect(['patient.id', 'patient.name', 'patient.email'])
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
  
  
  async deletePatientById(Id: number): Promise<{ message: string }> {
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

  // Appointment

  async viewallAppoinment(): Promise<AppointmentEntity[]> {
    const app = await this.appointmentRepo.find({
      select: ['Serial', 'name', 'age', 'date', 'time'],
      relations: ['doctor'],
    });
  
    if (app.length === 0) {
      return [{ name: 'No appointment to show' }] as AppointmentEntity[];
    }
  
    const rel: AppointmentEntity[] = app.map(appo => {
      const rel = { ...appo };
      if (rel.doctor) {
        rel.name = `Added by doctor ${rel.doctor.name}: ${rel.name}`;
        delete rel.doctor.password;
        delete rel.doctor.email;
      }
      return rel;
    });
  
    return rel;
  }
  


  async deleteAllAppointment(): Promise<{ message: string }> {
    const deleteResult = await this.doctorRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All appointment removed successfully' };
    } else {
      return { message: 'No appointment to remove' };
    }
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


  //Salary

async addSalary(salary: SalaryEntity): Promise<SalaryEntity> {
  try {
    return this.salaryRepo.save(salary);
  } catch (error) {
    throw new InternalServerErrorException('Failed to add salary');
  }
}


  async getAllDoctorSalary(): Promise<SalaryEntity[]> {
    const salaries = await this.salaryRepo.find({
      relations: ['doctor'],
    });
  
    const modifiedSalaries: SalaryEntity[] = salaries.map(salary => {
      if (salary.doctor) {
        salary.salary = ` Doctor ${salary.doctor.name} gets: ${salary.salary} Taka per Month`;
        delete salary.doctor.password;
        delete salary.doctor.email;
      }
      return salary;
    });
  
    return modifiedSalaries;
  }

  async deleteAllSalary(): Promise<{ message: string }> {
    const deleteSal = await this.salaryRepo.delete({});
    
    if (deleteSal.affected > 0) {
      return { message: 'All salaries cutted successfully' };
    } else {
      return { message: 'No Salaries to remove' };
    }
  }


  async updateSalarybycode(code: number, data: Partial<SalaryEntity>, name: string): Promise<{ message: string; updatedSalary: SalaryEntity }> {
    const salary = await this.salaryRepo.findOne({ where: { code } });
    
    if (!salary) {
      throw new NotFoundException('Patient not found');
    }
  
    const updatedSalary = Object.assign(salary, data);
    const savedSalary = await this.salaryRepo.save(updatedSalary);
    
    return { message: `Doctor salary of code ${code} updated successfully`, updatedSalary: savedSalary };
  }
  
  
//Eid Bonus

  async updateEidSalary(): Promise<SalaryEntity[]> {
  const salaries = await this.salaryRepo.find();

  const updatedSalaries: SalaryEntity[] = [];
  for (const salary of salaries) {
    const currentSalary = Number(salary.salary);
    const updatedSalaryValue = (currentSalary + 9500).toString();
    salary.salary = updatedSalaryValue;

    const updatedSalary = await this.salaryRepo.save(salary);
    updatedSalaries.push(updatedSalary);
  }

  return updatedSalaries;
}





  
  
  
}