import { Injectable, Session } from '@nestjs/common';
import { AddDocotorDTO, Article, DoctorEntity, LoginDTO, Refer } from './Doctor.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { DoctorModule } from './doctor.module';
import * as bcrypt from 'bcrypt';
import { NotificationEntity } from './Notification.entity';
import { CurrentDate, CurrentTime } from './current.date';
import { SessionGuard } from './Session.gaurd';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private DoctorRepo: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(NotificationEntity)
    private notificationRepo: Repository<NotificationEntity>
  ) {}

  async addDoctor(data: AddDocotorDTO): Promise<DoctorEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    console.log(data.password);
    console.log("Account Created Successfully");
  
    const savedDoctor = await this.DoctorRepo.save(data);
  
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = savedDoctor;
    notiFication.Message = "Account Created Successfully";
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();

    notiFication.date=currentDate.getCurrentDate();
    notiFication.time=currentTime.getCurrentTime();
    await this.notificationRepo.save(notiFication)



    return savedDoctor;
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
  
  async ChangePassword(email: string, password: string): Promise<DoctorEntity> {
    const doctor = await this.DoctorRepo.findOne({
      select: {
        password: true
      },
      where: {
        email: email,
      }
    });
  
    if (!doctor) {
      throw new Error('Doctor not found');
    }
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password.toString(), salt);
  
    await this.DoctorRepo.update({ email }, { password: hashedPassword });
  
    const updatedDoctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      },
    });
  
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = updatedDoctor;
    notiFication.Message = "Password Changed Successfully";
  
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
  
    await this.notificationRepo.save(notiFication);
  
    return updatedDoctor;
  }
  
  
  


  addArticle(data: Article): object {
    console.log("Article Posted Successfully");
    return data;
  }

  Refer(data: Refer): object {
    console.log("Refered Successfully");
    return data;
  }

  async addAppointment(appointment: any, email: string): Promise<AppointmentEntity> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
      appointment.doctor = doctor.id;
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
  
    const doctor = Search[0]; // Get the first doctor entity from the array
  
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
