import { Injectable, NotFoundException, Session } from '@nestjs/common';
import { SignupPatientDTO, PatientEntity, PatientLoginDTO  } from './Patient.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';
import { PaymentEntity } from './Payment.entity';
import { MailerService } from './mailer.service';
import * as bcrypt from 'bcrypt';
import { FeedbackEntity } from './feedback.entity';
import { MedicineEntity } from './medicine.entity';
import { TestEntity } from './test.entity';
import { NotificationEntity } from './notification.entity';
import { CurrentDate, CurrentTime } from 'src/Doctor/current.date';
import { PatientProfileEntity } from './PatientProfile.entity';

@Injectable()
export class PatientService {
  signupp(mydata: SignupPatientDTO) {
    throw new Error('Method not implemented.');
  }
 
  cancelappointment(id: number, cancelappointment: string): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }
  
 
  constructor(
    @InjectRepository(PatientEntity)
    private PatientRepo: Repository<PatientEntity>,
    @InjectRepository(DoctorEntity) 
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity) 
    private appointmentRepo: Repository<AppointmentEntity>,
    @InjectRepository(PaymentEntity) 
    private paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(FeedbackEntity) 
    private feedbackRepo: Repository<FeedbackEntity>,
    @InjectRepository(MedicineEntity) 
    private medicineRepo: Repository<MedicineEntity>,
    @InjectRepository(TestEntity) 
    private testRepo: Repository<TestEntity>,
    @InjectRepository(NotificationEntity) 
    private notificationRepo: Repository<NotificationEntity>,

    @InjectRepository(PatientProfileEntity) 
    private PatientProfileRepo: Repository<PatientProfileEntity>,



    private mailerService: MailerService
  ) {}

  // async addPatient(data): Promise<PatientEntity> {
  //   console.log("Account Created Successfully");
  //   return this.PatientRepo.save(data);
  // }
  // async addPatient(data:SignupPatientDTO): Promise<PatientEntity> {
  //   const salt = await bcrypt.genSalt();
  //   data.password = await bcrypt.hash(data.password, salt);
  //   console.log(data.password);
  //   console.log("Account Created Successfully");

  //   return this.PatientRepo.save(data);
  // }
  async signIn(data: PatientLoginDTO): Promise<boolean> {
    const userData = await this.PatientRepo.findOneBy({ email: data.email });
  
    if (userData !== undefined) {
      const match: boolean = await bcrypt.compare(data.password, userData.password);
      return match;
    }
  
    return false;
  }
  async addProfile(profileData: PatientProfileEntity, email: string): Promise<PatientProfileEntity> {
    const patient = await this.PatientRepo.findOne({ where: { email } });

    if (!patient) {
      throw new NotFoundException('Admin not found');
    }

    const profile = this.PatientProfileRepo.create(profileData);
    profile.patient = patient;

    return this.PatientProfileRepo.save(profile);
  }
  
 
  async ViewPersonalInfo(email: string): Promise<PatientEntity[]> {
    const visit = await this.PatientRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
        // filenames: false
        
      },
      where: {
        email: email,
        
      },
      relations: ['Profile']
    });
  
    const patient = visit[0];
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.patient = patient; 
    notiFication.Message = "Profile Visited";
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    await this.notificationRepo.save(notiFication);
    return visit;
  } 




  async ViewPersonalInfoWithEmail(email: string): Promise<PatientEntity> {
    const visit = await this.PatientRepo.findOne({
      select: {
        name: true,
        email: true,
        id: true,
        Gender:true,
        Degree:true,
        Blood_group:true,
        User:true,

        password: false,
        
      },
      where: {
        email: email,
        
      },
      relations: ['Profile']
    });
  
    const patient = visit[0];
    return visit;
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
  
  async signup(data: SignupPatientDTO): Promise<string> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    console.log(data.password);
    console.log("Account Created Successfully");
    try {
      const savedPatient = await this.PatientRepo.save(data);
  
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.patient = savedPatient; 
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
  
    async viewNotification(email: string): Promise<NotificationEntity[]> {
      const patient = await this.PatientRepo.findOne({
        where: {
          email: email,
        },
      });
    
      const notifications = await this.notificationRepo.find({
        where: {
          patient: patient,
        },
      });
    
      return notifications;
    }      

 

  async submitFeedback (feedback: any): Promise<FeedbackEntity> {
    return this.feedbackRepo.save(feedback);
  }

  async orderMedicine(orderMedicine: any): Promise<MedicineEntity> {
    return this.medicineRepo.save(orderMedicine);
  }
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail(to, subject, text);
  }


async editProfile(id: number, updatedPatientData: Partial<PatientEntity>): Promise<PatientEntity> {
  const patient = await this.PatientRepo.findOne({ where: { id } });
  if (!patient) {
    throw new NotFoundException('Patient not found');
  }

  Object.assign(patient, updatedPatientData);

  return this.PatientRepo.save(patient);
}

async getDoctorById(id: number): Promise<DoctorEntity> {
  return this.doctorRepo.findOne({ 
    where: { id },
    select: ['id', 'name', 'email', 'Gender', 'Degree' ],
  });
}
async addAppointment(appointment: any): Promise<AppointmentEntity> {
  return this.appointmentRepo.save(appointment);
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
async payment(payment: any): Promise<PaymentEntity> {
  return this.paymentRepo.save(payment);
}

async test(test: any): Promise<TestEntity> {
  return this.testRepo.save(test);
}


async update(id: number, update: string): Promise<TestEntity> {
  const Test = await this.testRepo.findOne({ where: { id } });
  if (!Test) {
    throw new NotFoundException('Not updated');
  }

  Test.update = update;
  return this.testRepo.save(Test);
}

async Logout(@Session() session, email: string) {
  const Search = await this.PatientRepo.find({
    select: {
      name: true,
      id: true,
      password: false
    },
    where: {
      email: email,
    }
  });

  const patient = Search[0];

  const notiFication: NotificationEntity = new NotificationEntity();
  notiFication.patient = patient;
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


