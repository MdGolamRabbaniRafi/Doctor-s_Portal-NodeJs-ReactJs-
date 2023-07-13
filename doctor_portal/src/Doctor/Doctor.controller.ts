import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Session, UseGuards } from '@nestjs/common';
import { DoctorService } from './Doctor.service';
import { AddDocotorDTO, DoctorEntity, LoginDTO } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { SessionGuard } from './Session.gaurd';
import { NotificationEntity } from './Notification.entity';
import { Article } from './article.entity';
import {  ReferEntity } from './refer.entity';

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

  // @Put('/ChangePassword')
  // @UseGuards(SessionGuard)
  // ChangePassword(@Body()password,@Session() session): Object {
  //   return this.doctorService.ChangePassword(session.email,password);
  // }


  @Post('/addArticle')
  @UseGuards(SessionGuard)
  addArticle(@Body() article: Article,@Session() session): object {
    return this.doctorService.addArticle(article,session.email);
  }

  @Post('/refer')
  @UseGuards(SessionGuard)     
  Refer(@Body() reference: ReferEntity,@Session() session): object {
    return this.doctorService.Refer(reference,session.email);
  }

  @Post('/addappointment')
  @UseGuards(SessionGuard)
  addAppointment(@Body() appointment: any,@Session() session): Promise<AppointmentEntity | String>{
    return this.doctorService.addAppointment(appointment,session.email);
  }

  @Get('/viewAppointment')
  @UseGuards(SessionGuard)
  viewAppointment(@Session() session): Promise<DoctorEntity[]> {
    return this.doctorService.viewAppointment(session.email);
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
