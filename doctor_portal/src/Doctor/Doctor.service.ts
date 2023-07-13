import { Injectable, Session } from '@nestjs/common';
import { AddDocotorDTO, DoctorEntity, LoginDTO } from './Doctor.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import * as bcrypt from 'bcrypt';
import { NotificationEntity } from './Notification.entity';
import { CurrentDate, CurrentTime } from './current.date';
import { Article, ArticleEntity } from './article.entity';
import { ReferEntity } from './refer.entity';
import { PatientEntity } from 'src/Patient/Patient.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private DoctorRepo: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(NotificationEntity)
    private notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(ReferEntity)
    private referRepo: Repository<ReferEntity>,
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>
  ) {}
  async addDoctor(data: AddDocotorDTO): Promise<DoctorEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    console.log(data.password);
    console.log("Account Created Successfully");
    try {
      const savedDoctor = await this.DoctorRepo.save(data);
  
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.doctor = savedDoctor; 
      notiFication.Message = "Account Created Successfully";
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
  
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      await this.notificationRepo.save(notiFication);
  
      return savedDoctor;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  
  async viewNotification(email: string): Promise<NotificationEntity[]> {
    const doctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      },
    });
  
    const notifications = await this.notificationRepo.find({
      where: {
        doctor: doctor,
      },
    });
  
    return notifications;
  }
  
  
  async ViewProfile(email: string): Promise<DoctorEntity[]> {
    const visit = await this.DoctorRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: false
      },
      where: {
        email: email,
      }
    });
  
    const doctor = visit[0];
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor; 
    notiFication.Message = "Profile Visited";
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    await this.notificationRepo.save(notiFication);
    return visit;
  }

  async Edit(email: string, updateDoctor: AddDocotorDTO): Promise<DoctorEntity> {
    const salt = await bcrypt.genSalt();
    updateDoctor.password = await bcrypt.hash(updateDoctor.password, salt);
    
    const updateResult = await this.DoctorRepo.update({ email }, updateDoctor);
    const doctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      },
    });
    
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor;
    notiFication.Message = "Account Edited Successfully";
    
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    
    await this.notificationRepo.save(notiFication);
    
    return doctor;
    
  }
  
  
  async Searching(id: number, email: string): Promise<DoctorEntity[]> {
    const search = await this.DoctorRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: false
      },
      where: {
        id: id,
      }
    });
  
    const searchDoctor = await this.DoctorRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: false
      },
      where: {
        email: email,
      }
    });
  
    const doctor = searchDoctor[0];
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor;
    notiFication.Message = "Search a profile";
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    await this.notificationRepo.save(notiFication);
  
    return search;
  }
  
  // async ChangePassword(email: string, password: string): Promise<DoctorEntity> {
  //   const doctor = await this.DoctorRepo.findOne({
  //     select: {
  //       password: true
  //     },
  //     where: {
  //       email: email,
  //     }
  //   });
  
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password.toString(), salt);
  
  //   await this.DoctorRepo.update({ email }, { password: hashedPassword });
  
  //   const updatedDoctor = await this.DoctorRepo.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });

  //   if (updatedDoctor) {
  //     const notiFication: NotificationEntity = new NotificationEntity();
  //     const currentDate: CurrentDate = new CurrentDate();
  //     const currentTime: CurrentTime = new CurrentTime();
  //     notiFication.Message = "Password Changed Successfully"; 
  //     notiFication.date = currentDate.getCurrentDate();
  //     notiFication.time = currentTime.getCurrentTime();
  //     notiFication.doctor = updatedDoctor;
  
  //     await this.notificationRepo.save(notiFication);
  //   } else {
   
  //     throw new Error("Doctor not found or invalid email");
  //   }

  
  //   const notiFication: NotificationEntity = new NotificationEntity();
  
  
  //   await this.notificationRepo.save(notiFication);
  
  //   return updatedDoctor;
  // }
  async addArticle(data: Article, email: string): Promise<ArticleEntity> {
    const doctor = await this.DoctorRepo.findOne({
      where: { email: email },
    });
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    const articlePost: ArticleEntity = new ArticleEntity();
  
 
  
    articlePost.name = data.name;
    articlePost.Link = data.Link;
    articlePost.Publish_date = currentDate.getCurrentDate();
    articlePost.Publish_time = currentTime.getCurrentTime();
    articlePost.doctor=doctor;
    const savedArticle = await this.articleRepo.save(articlePost);

    console.log("Article Posted Successfully");
   
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.Message = "Post Article"; 
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      notiFication.doctor = doctor;
  
      await this.notificationRepo.save(notiFication);
  
    return savedArticle;
  }
  
  
 
  async Refer(data: ReferEntity, email: string): Promise<ReferEntity> {
    const doctor = await this.DoctorRepo.findOne({
      where: { email: email },
    });
    
    const makeRefer: ReferEntity = new ReferEntity();
    makeRefer.Refer = data.Refer;
    makeRefer.ReferTo = data.ReferTo;
    makeRefer.doctor = doctor; 
    const savedRefer = await this.referRepo.save(makeRefer);
  
    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Refer a doctor"; 
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
  
    await this.notificationRepo.save(notiFication);
    return savedRefer;
  }
  async addAppointment(appointment: any, email: string): Promise<AppointmentEntity | string> {
    const makeAppointment: AppointmentEntity = new AppointmentEntity();
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
    if (!doctor) {
      return "Doctor not found";
    }
  
    const PatientEmail = appointment.email;
    let Patient: PatientEntity;
    try {
      Patient = await this.patientRepo.findOne({ where: { email: PatientEmail } });
      if (!Patient) {
        return "Invalid Email";
      }
    } catch (error) {
      return "Error fetching patient";
    }
  
    appointment.patient = Patient.id;
    appointment.doctor = doctor.id;
    makeAppointment.name = Patient.name; 
    makeAppointment.age = appointment.age;
    makeAppointment.email = Patient.email;

    makeAppointment.date = appointment.date;
    makeAppointment.time = appointment.time;
    makeAppointment.doctor = appointment.doctor;
    makeAppointment.patient = appointment.patient;
    console.log("completeAppointment")

    const completeAppointment=await this.appointmentRepo.save(makeAppointment);
    console.log(completeAppointment)
    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Make an Appointment";
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
  
    await this.notificationRepo.save(notiFication);
    return completeAppointment;
  }
  
  
  
  

  async viewAppointment(email: string): Promise<DoctorEntity[]> {
    const AllAppointment = await this.DoctorRepo.find({
      where: { email },
      relations: {
        appointment: true,
      },
    });
    const doctor = await this.DoctorRepo.findOne({ where: { email } });

    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Cheak all Appointment"; 
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
  
    await this.notificationRepo.save(notiFication);
    return AllAppointment;
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
  async signIn(data: LoginDTO): Promise<boolean> {
    const userData = await this.DoctorRepo.findOneBy({ email: data.email });
  
    if (userData !== undefined) {
      const match: boolean = await bcrypt.compare(data.password, userData.password);
      return match;
    }
  
    return false;
  }

  async Logout(@Session() session, email: string) {
    const Search = await this.DoctorRepo.find({
      select: {
        name: true,
        id: true,
        password: false
      },
      where: {
        email: email,
      }
    });
  
    const doctor = Search[0];
  
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor;
    notiFication.Message = "Logged Out";
  
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
  
    await this.notificationRepo.save(notiFication);
  
    session.destroy();
    return "Logout Successfully";
  }
  
  
  
}
