import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Session, UseGuards } from '@nestjs/common';
import { DoctorService } from './Doctor.service';
import { AddDocotorDTO, Article, DoctorEntity, LoginDTO, Refer } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { DoctorModule } from './doctor.module';
<<<<<<< HEAD
import { SessionGuard } from './Session.gaurd';
import { NotificationEntity } from './Notification.entity';
=======
>>>>>>> 3443213db0733a95a4242b6f05ffe0d552121317

var doctors = [];
var articles = [];

@Controller('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/addDoctor')
  @UsePipes(new ValidationPipe())
  addDoctor(@Body() doctor: AddDocotorDTO): object {
    return this.doctorService.addDoctor(doctor);
  }

  @Get('/ViewProfile')
  @UseGuards(SessionGuard)
  ViewProfile(@Session() session): Object {
    return this.doctorService.ViewProfile(session.email);
  }

  @Put('/Edit')
  @UseGuards(SessionGuard)
  Edit(@Body() updateDoctor: AddDocotorDTO,@Session() session): Object {
    return this.doctorService.Edit(session.email, updateDoctor);
    
  }

  @Get('/Searching/:id')
  @UseGuards(SessionGuard)
  Searching(@Param('id') id: number,@Session() session): Object {
    return this.doctorService.Searching(id,session.email);
  }

  @Put('/ChangePassword')
  @UseGuards(SessionGuard)
  ChangePassword(@Body()password,@Session() session): Object {
    return this.doctorService.ChangePassword(session.email,password);
  }

  @Post('/addArticle')
  addArticle(@Body() article: Article): object {
    articles.push(article);
    return this.doctorService.addArticle(article);
  }

  @Post('/Refer')
  Refer(@Body() reference: Refer): object {
    return this.doctorService.Refer(reference);
  }

  @Post('/addappointment')
  @UseGuards(SessionGuard)
  addAppointment(@Body() appointment: any,@Session() session): Promise<AppointmentEntity> {
    console.log(appointment);
    return this.doctorService.addAppointment(appointment,session.email);
  }

  @Get('/viewAppointment/:doctorid')
  viewAppointment(@Param('doctorid', ParseIntPipe) doctorid: number): Promise<DoctorEntity[]> {
    return this.doctorService.viewAppointment(doctorid);
  }
  @Get('/notification')
  @UseGuards(SessionGuard)
  viewNotification(@Session() session): Promise<NotificationEntity[]> {
    return this.doctorService.viewNotification(session.email);
  }

  @Delete('/deleteAllAppointments/:doctorid')
  deleteAllAppointments(@Param('doctorid', ParseIntPipe) doctorId: number): Promise<void> {
    return this.doctorService.deleteAllAppointments(doctorId);
  }

  @Delete('/deleteOneAppointment/:doctorid/:serial')
  deleteOneAppointment(
    @Param('doctorid', ParseIntPipe) doctorId: number,
    @Param('serial', ParseIntPipe) serial: number,
  ): Promise<void> {
    return this.doctorService.deleteOneAppointment(doctorId, serial);
  }

  @Put('/appointments/:doctorId/:appointmentId')
  updateAppointment(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() Data: AppointmentEntity,
  ): Promise<AppointmentEntity> {
    return this.doctorService.updateAppointment(doctorId, appointmentId, Data);
  }
  
  @Post('/signin')
  async signIn(@Body() data: LoginDTO, @Session() session) {

      const loginSuccess = await this.doctorService.signIn(data);
  
      if (loginSuccess) {
        session.email = data.email;
        return "Login successful";
      } else {
        return "Login Failed";
      }
  }
  
  @Post('/logout')
  @UseGuards(SessionGuard)
  async logout(@Session() session) {
    return this.doctorService.Logout(session,session.email);

  
  }

}
