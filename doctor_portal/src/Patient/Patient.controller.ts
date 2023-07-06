import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PatientService } from './Patient.service';
import { SignupPatientDTO,  PatientEntity,  } from './Patient.dto';

 // var patients = [];
// var articles = [];

@Controller('Patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/addPatient')
  @UsePipes(new ValidationPipe())
  addPatient(@Body() patient:SignupPatientDTO): Promise<PatientEntity>   {
    console.log("o")
    return this.patientService.addPatient(patient);
  }
  @Get('/SeeProfile/:id')
  SeeProfile(@Param('id') id: number): Object {
    return this.patientService.SeeProfile(id);
  }

  // @Get('/SeeProfile/:id')
  // SeeProfile(@Param('id') id: number): Object {
  //   return this.patientService.SeeProfile(id);
  // }

  // @Put('/Edit/:id')
  // Edit(@Param('id') id: number, @Body() updatePatient: AddPatientDTO): Object {
  //   return this.patientService.Edit(id, patients, updatePatient);
  // }

  // @Get('/Searching/:id')
  // Searching(@Param('id') id: number): Object {
  //   return this.patientService.Searching(id, patients);
  // }

  // @Put('/ChangePassword/:id')
  // ChangePassword(@Param('id') id: number, @Body() pass: AddPatientDTO): Object {
  //   return this.patientService.ChangePassword(id, patients, pass);
  // }


 

  // @Post('/addappointment')
  // addAppointment(@Body() appointment: any): Promise<AppointmentEntity> {
  //   console.log(appointment);
  //   return this.patientService.addAppointment(appointment);
  // }

  // @Get('/viewAppointment/:patientid')
  // viewAppointment(@Param('patientid', ParseIntPipe) patientid: number): Promise<PatientEntity[]> {
  //   return this.patientService.viewAppointment(patientid);
  // }

//   @Delete('/deleteAllAppointments/:doctorid')
//   deleteAllAppointments(@Param('doctorid', ParseIntPipe) doctorId: number): Promise<void> {
//     return this.doctorService.deleteAllAppointments(doctorId);
//   }

//   @Delete('/deleteOneAppointment/:doctorid/:serial')
//   deleteOneAppointment(
//     @Param('doctorid', ParseIntPipe) doctorId: number,
//     @Param('serial', ParseIntPipe) serial: number,
//   ): Promise<void> {
//     return this.doctorService.deleteOneAppointment(doctorId, serial);
//   }

//   @Put('/appointments/:doctorId/:appointmentId')
//   updateAppointment(
//     @Param('doctorId', ParseIntPipe) doctorId: number,
//     @Param('appointmentId', ParseIntPipe) appointmentId: number,
//     @Body() Data: AppointmentEntity,
//   ): Promise<AppointmentEntity> {
//     return this.doctorService.updateAppointment(doctorId, appointmentId, Data);
//   }
// }
}
