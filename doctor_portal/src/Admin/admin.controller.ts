import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDTO} from './admin.dto';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import{AdminEntity} from './admin.entity';
import { PatientEntity } from 'src/Patient/Patient.dto';

var doctors = [];
var articles = [];

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/addadmin')
  @UsePipes(new ValidationPipe())
  addAdmin(@Body() doctor: AddAdminDTO): object {
    return this.adminService.addAdmin(doctor);
  }

  @Get('/ViewAdminProfile/:id')
  ViewProfile(@Param('id') id: number): Object {
    return this.adminService.ViewProfile(id);
  }

  
//Doctor Section

  @Post('/adddoctor')
  addDoctor(@Body() doctor: any): Promise<DoctorEntity> {
    console.log(doctor);
    return this.adminService.addDoctor(doctor);
  }

  @Get('/viewalldoctor')
  getAllDoctor(): Promise<DoctorEntity[]> {
  return this.adminService.getAllDoctor();
}

@Get('/doctor/:id')
getDoctorById(@Param('id', ParseIntPipe) id: number): object {
  return this.adminService.getDoctorById(id);
}

  @Get('/viewdoctorbyadmin/:adminid')
  viewDoctorsByAdmin(@Param('adminid', ParseIntPipe) adminid: number): Promise<AdminEntity[]> {
    return this.adminService.viewDoctorsByAdmin(adminid);
  }

  @Delete('/deletedoctorss')
  deleteAllDoctors(): object {
    return this.adminService.deleteAllDoctors();
  }

  @Delete('/deleteOneDoctor/:id')
  deleteOneDoctor(@Param('id', ParseIntPipe) Id: number): Promise<{ message: string }> {
    return this.adminService.deleteOneDoctor(Id);
  }

//Patient Section

  @Post('/addpatient')
  addPatient(@Body() patient: any): Promise<PatientEntity> {
    console.log(patient);
    return this.adminService.addPatient(patient);
  }

  @Get('/viewallpatient')
  getAllPatient(): Promise<PatientEntity[]> {
  return this.adminService.getAllPatient();
}

@Get('/patient/:id')
getPatientById(@Param('id', ParseIntPipe) id: number): object {
  return this.adminService.getPatientById(id);
}

  @Get('/viewpatientbyadmin/:adminid')
  viewPatientsByAdmin(@Param('adminid', ParseIntPipe) adminid: number): Promise<AdminEntity[]> {
    return this.adminService.viewPatientsByAdmin(adminid);
  }

  @Delete('/deletepatients')
  deleteAllPatients(): object {
    return this.adminService.deleteAllPatients();
  }

  @Delete('/deleteOnePatient/:id')
  deleteOnePatient(@Param('id', ParseIntPipe) Id: number): Promise<{ message: string }> {
    return this.adminService.deleteOnePatient(Id);
  }
  

}