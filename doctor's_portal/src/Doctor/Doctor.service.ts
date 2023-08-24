import { HttpException, HttpStatus, Injectable, Res, Session } from '@nestjs/common';
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
import { FileEntity } from './file.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerEntity } from './mailer.entity';
import { AdminEntity } from 'src/Admin/admin.entity';

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
    private patientRepo: Repository<PatientEntity>,
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>,
    @InjectRepository(MailerEntity)
    private mailerRepo: Repository<MailerEntity>,
    private mailerService: MailerService,
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
  ) {}
  async addDoctor(data: AddDocotorDTO): Promise<string> {
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
      return "Registration successful"
  
    } catch (error) {
      console.error(error);
      return "Registration failed"
    }
  }
  
  
  async viewNotification(email: string): Promise<NotificationEntity[]> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } })
  
    const notifications = await this.notificationRepo.find({
      where: {
        doctor: doctor,
      },
    });
  
    return notifications;
  }
  
  
  
  async ViewProfile(email: string): Promise<DoctorEntity> {
    const visit = await this.DoctorRepo.findOne({
      select: {
        name: true,
        email: true,
        id: true,
        Gender:true,
        Blood_group:true,
        Degree:true,
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
    // const salt = await bcrypt.genSalt();
    // updateDoctor.password = await bcrypt.hash(updateDoctor.password, salt);
    
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
  
  
  async Searching(id: string, email: string): Promise<DoctorEntity|PatientEntity|AdminEntity|string> {
    const searchDoctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      }
    });
    
    const doctorUser = await this.DoctorRepo.findOne({
      where: {
        email: id,
      }
    });
  
    const patientUser = await this.patientRepo.findOne({
      where: {
        email: id,
      }
    });
  
    const AdminUser = await this.adminRepo.findOne({
      where: {
        email: id,
      }
    });
  
  
    
      // if (!doctorUser&&!patientUser&&!AdminUser) {
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // }
    
      const doctor = searchDoctor;
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.doctor = doctor;
      notiFication.Message = 'Search a profile';
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
    
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      await this.notificationRepo.save(notiFication);
    
      if (doctorUser) {
        return doctorUser;
      } 
      
      else if (patientUser) {
        return patientUser;
      }
      
      else if (AdminUser) {
        return AdminUser;
      } else {
        return  "User Not Found";
      }
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
  async addAppointment(appointment: any,email): Promise<AppointmentEntity | string> {
    const makeAppointment: AppointmentEntity = new AppointmentEntity();
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
  
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
  
  
  
  

  async viewAppointment(email:any): Promise<DoctorEntity[]> {
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

  async deleteAllAppointments(email: string): Promise<string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
    const appointments = await this.appointmentRepo.find({
      where: { doctor },
      relations: ['doctor'], 
    });
  
    await this.appointmentRepo.remove(appointments);

    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Cancel all Appointment"; 
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
    await this.notificationRepo.save(notiFication);
    return "All appointments deleted";
  }
  

 
  
  async deleteOneAppointment(email: string, serial: number): Promise<string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
    let appointment: AppointmentEntity;
  
    try {
      appointment = await this.appointmentRepo.findOne({
        where: { doctor: doctor, Serial: serial },
        relations: ['doctor'],
      });
  
      if (!appointment) {
        return "Invalid Serial Number";
      }
  
      await this.appointmentRepo.remove(appointment);
  
      const notiFication: NotificationEntity = new NotificationEntity();
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
      notiFication.Message = "Delete a single Appointment";
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      notiFication.doctor = doctor;
      await this.notificationRepo.save(notiFication);
  
      return "Appointment deleted";
    } catch (error) {
      return "Error deleting Appointment";
    }
  }
  
  

  async updateAppointment(email: any, serial: number, data: AppointmentEntity): Promise<AppointmentEntity  | string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
    const appointment = await this.appointmentRepo.findOne({
      where: { doctor: doctor, Serial: serial },
      relations: ['doctor'],
    });
  
    if (!appointment) {
      return "Don't find any appointment";
    }
  
    await this.appointmentRepo.update(serial, data);
    const UpdateAppointment= this.appointmentRepo.findOne({
      where: { Serial: serial },
    });


    
    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Update a Appointment";
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
    await this.notificationRepo.save(notiFication);


    return UpdateAppointment;
  }
  
  async signIn(data: LoginDTO): Promise<boolean> {
    const userData = await this.DoctorRepo.findOneBy({ email: data.email });
  
    if (userData !== undefined) {
      const match: boolean = await bcrypt.compare(data.password, userData.password);
      const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Logged in a device";
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = userData;
    await this.notificationRepo.save(notiFication);
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

  async uploadFile(email: string, FileFullName: string): Promise<string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });    
    console.log(FileFullName)
  
    const Fileobj: FileEntity = new FileEntity();
    Fileobj.File = FileFullName;
  
    Fileobj.doctor = doctor;
    await this.fileRepo.save(Fileobj);
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor;
    notiFication.Message = "Profile Picture Uploaded";
  
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
  
    await this.notificationRepo.save(notiFication);
  
    return 'File uploaded successfully';
  }







  
  async changePicture(email: string, FileFullName: string): Promise<string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });
    console.log(FileFullName);
  
    await this.fileRepo.update({ doctor: doctor }, { File: FileFullName });
  
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.doctor = doctor;
    notiFication.Message = "Profile Picture Uploaded";
  
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
  
    await this.notificationRepo.save(notiFication);
  
    return 'File uploaded successfully';
  }
  






  async uploadDefaultPicture(email: string, FileFullName: string): Promise<string> {
    const doctor = await this.DoctorRepo.findOne({ where: { email } });    
    console.log(FileFullName)
  
    const Fileobj: FileEntity = new FileEntity();
    Fileobj.File = FileFullName;
  
    Fileobj.doctor = doctor;
    await this.fileRepo.save(Fileobj);
    return 'File uploaded successfully';
  }
  


  async getImages(email: string, res: any) {
    const doctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      },
    });
  
    try {
      const nameFile : FileEntity= await this.fileRepo.findOne({
        where: {
          doctor: doctor,
        },
      });
      const name = nameFile.File;
  
        res.sendFile(name, { root: './DoctorFiles' }, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            return res.status(404).send('Missing Profile Picture');
        } else {

            console.log('File sent successfully:', name);
        }
    }
    );
    } catch (error) {
      return res.status(404).send('Missing Profile Picture');
    }
  }












  
  async sendEmail(email: string, emailData: any):Promise<String> {
    const doctor = await this.DoctorRepo.findOne({
      where: {
        email: email,
      },
    });
    try {
        
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
      await this.mailerService.sendMail(emailData);
      const mailer: MailerEntity = new MailerEntity();
      mailer.to = emailData.to;
      mailer.subject = emailData.subject;
      mailer.text = emailData.text;
      mailer.doctor = doctor;
      mailer.Date=currentDate.getCurrentDate();
      mailer.Time=currentTime.getCurrentTime();
      await this.mailerRepo.save(mailer);
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.doctor = doctor;
      notiFication.Message = "Sent a Email";

  
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
  
      await this.notificationRepo.save(notiFication);
    } catch (error) {
      return "Email doesn't sent";

    }
    return "Email Send successfully";

  }
  
  async checkEmailHistory(email: string): Promise<any> {
    const mailes = await this.DoctorRepo.find({
      where: { email },
      relations: {
        mail: true,
      },
    });
    const doctor = await this.DoctorRepo.findOne({ where: { email } });

    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Cheak Email History"; 
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.doctor = doctor;
  
    await this.notificationRepo.save(notiFication);
    return mailes;
  }
  async searchUser(email: string): Promise<string> {
    const doctorUser = await this.DoctorRepo.findOne({
      where: {
        email: email,
      }
    });
  
    const patientUser = await this.patientRepo.findOne({
      where: {
        email: email,
      }
    });
  
    const AdminUser = await this.adminRepo.findOne({
      where: {
        email: email,
      }
    });
  
    if (doctorUser) {
      return "Doctor";
    } else if (patientUser) {
      return "Patient";
    } else if (AdminUser) {
      return "Admin";
    } else {
      return "Not found";
    }
  }



  async viewArticle(): Promise<ArticleEntity[]> {
    const AllArtiicle = await this.articleRepo.find();


    return AllArtiicle;
  }
    
  
  }
  
