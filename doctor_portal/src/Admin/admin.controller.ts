import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDTO} from './admin.dto';
import { DoctorEntity } from '../Doctor/Doctor.dto';
import{AdminEntity} from './admin.entity';

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

  

  @Post('/adddoctor')
  addDoctor(@Body() doctor: any): Promise<DoctorEntity> {
    console.log(doctor);
    return this.adminService.addDoctor(doctor);
  }

  @Get('/viewdoctor/:adminid')
  viewDoctor(@Param('adminid', ParseIntPipe) adminid: number): Promise<AdminEntity[]> {
    return this.adminService.viewDoctor(adminid);
  }

}