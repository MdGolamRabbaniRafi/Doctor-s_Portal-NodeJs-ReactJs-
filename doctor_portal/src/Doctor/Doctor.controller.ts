import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { DoctorService } from './Doctor.service';
import { AddDocotorDTO, Article, DoctorEntity, Refer } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';

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

  @Get('/ViewProfile/:id')
  ViewProfile(@Param('id') id: number): Object {
    return this.doctorService.ViewProfile(id);
  }

  @Put('/Edit/:id')
  Edit(@Param('id') id: number, @Body() updateDoctor: AddDocotorDTO): Object {
    return this.doctorService.Edit(id, doctors, updateDoctor);
  }

  @Get('/Searching/:id')
  Searching(@Param('id') id: number): Object {
    return this.doctorService.Searching(id, doctors);
  }

  @Put('/ChangePassword/:id')
  ChangePassword(@Param('id') id: number, @Body() pass: AddDocotorDTO): Object {
    return this.doctorService.ChangePassword(id, doctors, pass);
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
  addAppointment(@Body() appointment: any): Promise<AppointmentEntity> {
    console.log(appointment);
    return this.doctorService.addAppointment(appointment);
  }

  @Get('/viewAppointment/:doctorid')
  viewAppointment(@Param('doctorid', ParseIntPipe) doctorid: number): Promise<DoctorEntity[]> {
    return this.doctorService.viewAppointment(doctorid);
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
}
