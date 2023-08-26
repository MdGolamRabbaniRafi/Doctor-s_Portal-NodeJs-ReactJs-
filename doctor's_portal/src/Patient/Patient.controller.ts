import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Session, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, BadRequestException, ParseFloatPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PatientService } from './Patient.service';

import { SignupPatientDTO,  PatientEntity, PatientLoginDTO,  } from './Patient.dto';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';
import { PaymentEntity } from './Payment.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { FeedbackEntity } from './feedback.entity';
import { MedicineEntity } from './medicine.entity';
import { TestEntity } from './test.entity';
import { SessionGuard } from 'src/Doctor/Session.gaurd';
import { NotificationEntity } from './notification.entity';
import { PatientProfileEntity } from './PatientProfile.entity';



@Controller('Patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // @Post('/addPatient')
  // @UsePipes(new ValidationPipe())
  // addPatient(@Body() patient:SignupPatientDTO): object   {
    
  //   return this.patientService.addPatient(patient);
  // }
  @Get('/ViewMyProfile/:email')
  @UseGuards(SessionGuard)
  ViewPersonalInfoWithEmail( @Param('email') email: string): Object{
    return this.patientService.ViewPersonalInfoWithEmail(email);

  }
  
  @Get('/ViewMyProfile')
  @UseGuards(SessionGuard)
  ViewPersonalInfo(@Session() session): Object{
    return this.patientService.ViewPersonalInfo(session.email);

  }
  @Post('/addProfile')
  @UseGuards(SessionGuard)
  async addProfile(@Body() profileData: PatientProfileEntity, @Session() session): Promise<PatientProfileEntity> {
    const email = session.email;
    return this.patientService.addProfile(profileData, email);
  }
  
  @Get('/SeeProfile/:id')
  SeeProfile(@Param('id') id: number): Object {
    return this.patientService.SeeProfile(id);
  }
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() patient: SignupPatientDTO): Promise<string> {
    return this.patientService.signup(patient);
  }

  @Post('/signin')
  async signIn(@Body() data: PatientLoginDTO, @Session() session) {
    if (session.email == undefined) {
      const loginSuccess = await this.patientService.signIn(data);
  
      if (loginSuccess) {
        session.email = data.email;
        return "Login successful";
      } else {
        return "Login Failed";
      }
    } else {
      return "Already logged in an account. Please log out first.";
    }
  }
  
    
  @Post('/signout')
  @UseGuards(SessionGuard)
  async logout(@Session() session) {
    return this.patientService.Logout(session,session.email);
  
  
  }
  

  @Get('/notification')
  @UseGuards(SessionGuard)
  viewNotification(@Session() session): Promise<NotificationEntity[]> {
    return this.patientService.viewNotification(session.email);
  }
  @Post('/sendemail')
  async sendEmail(@Body() emailData: { to: string; subject: string; text: string }): Promise<void> {
    const { to, subject, text } = emailData;
    await this.patientService.sendEmail(to, subject, text);
  }

  
  @Post('/submitFeedback')
  submitFeedback(@Body() feedback: any): Promise<FeedbackEntity> {
    console.log(feedback);
    return this.patientService.submitFeedback(feedback);
  }

  @Post('/orderMedicine')
  orderMedicine(@Body() orderMedicine: any): Promise<MedicineEntity> {
    console.log(orderMedicine);
    return this.patientService.orderMedicine(orderMedicine);
  }


@Put('/editProfile/:id')
@UsePipes(new ValidationPipe())
editProfile(
  @Param('id', ParseIntPipe) id: number,
  @Body() updatedPatientData: Partial<PatientEntity>,
): Promise<PatientEntity> {
  return this.patientService.editProfile(id, updatedPatientData);
}

@Get('/searchdoctor/:id')
getDoctorById(@Param('id', ParseIntPipe) id: number): object {
  return this.patientService.getDoctorById(id);
}

@Post('/addAppointment')
  addAppointment(@Body() appointment: any): Promise<AppointmentEntity> {
    console.log(appointment);
    return this.patientService.addAppointment(appointment);
  }

  @Delete('/deleteOneAppointment/:Serial')
  deleteAppointment(@Param('Serial', ParseIntPipe) Serial: number): Promise<{ message: string }> {
    return this.patientService.deleteAppointment(Serial);
  }

  @Post('/payment')
  payment(@Body() payment: any): Promise<PaymentEntity > {
    console.log(payment);
    return this.patientService.payment(payment);
  }

  @Post('/test')
  test(@Body() test: any): Promise<TestEntity > {
    console.log(test);
    return this.patientService.test(test);
  }
  
  @Put('/test/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('update') update: string,
  ): Promise<TestEntity> {
    return this.patientService.update(id, update);
  }
}

