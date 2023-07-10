import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Session } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDTO} from './admin.dto';
import { AddDocotorDTO, DoctorEntity } from '../Doctor/Doctor.dto';
import{AdminEntity} from './admin.entity';
import { PatientEntity } from 'src/Patient/Patient.dto';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoticeEntity } from './noticeBoard.entity';




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

  @Post('/signup')
  // @UseInterceptors(FileInterceptor('image',
  //     {
  //         fileFilter: (req, file, cb) => {
  //             if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //                 cb(null, true);
  //             else {
  //                 cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //             }
  //         },
  //         limits: { fileSize: 30000 },
  //         storage: diskStorage({
  //             destination: './uploads',
  //             filename: function (req, file, cb) {
  //                 cb(null, Date.now() + file.originalname)
  //             },
  //         })
  //     }
  // ))
  @UsePipes(new ValidationPipe)
  signup(@Body() mydata: AddAdminDTO, @UploadedFile() imageobj: Express.Multer.File) {
      console.log(mydata);
      // console.log(imageobj.filename);
      // mydata.filenames = imageobj.filename;
      return this.adminService.signup(mydata);

  }

  @Post('/signin')
  signIn(@Body() data: AddAdminDTO, @Session() session) {

      if (this.adminService.signIn(data)) {
          session.email = data.email;
          return true;
      }
      else {

          return false;
      }
      // return this.adminService.signIn(data);
  }

 //Email


  @Post('/emailSending')
  emailSending(@Body() clientdata) {
      return this.adminService.emailSending(clientdata);
  }

 //Notice Board

 @Post('/addNotice')
 addNotice(@Body() notice: any): Promise<NoticeEntity> {
   console.log(notice);
   return this.adminService.addNotice(notice);
 }

 @Get('/viewallnotice')
  getAllNotice(): Promise<NoticeEntity[]> {
  return this.adminService.getAllNotice();
}

@Delete('/deleteallnotice')
deleteAllNotice(): object {
  return this.adminService.deleteAllNotice();
}

@Delete('/deleteOneNotice/:sl')
  deleteOneNotice(@Param('sl', ParseIntPipe) SL: number): Promise<{ message: string }> {
    return this.adminService.deleteOneNotice(SL);
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

  @Get('/adminaddeddoctors/:adminid')
  viewDoctorsByAdmin(@Param('adminid', ParseIntPipe) adminid: number): Promise<AdminEntity[]> {
    return this.adminService.viewDoctorsByAdmin(adminid);
  }

  @Delete('/deletedoctors')
  deleteAllDoctors(): object {
    return this.adminService.deleteAllDoctors();
  }

  @Delete('/deleteOneDoctor/:id')
  deleteOneDoctor(@Param('id', ParseIntPipe) Id: number): Promise<{ message: string }> {
    return this.adminService.deleteOneDoctor(Id);
  }

  @Put('/doctor/:id')
  updateDoctorById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<DoctorEntity>,
    @Body('name') name: string,
  ): Promise<{ message: string; updatedDoctor: DoctorEntity }> {
    return this.adminService.updateDoctorById(id, data, name);
  }
  
  // @Put('/updatesalary')
  //   @UsePipes(new ValidationPipe())
  //   updateSalary(@Body() data: AddDocotorDTO): object {
  //     return this.adminService.updateAdmin(data);
  //   }
    

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

  @Get('/adminaddedpatitents/:adminid')
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

  @Put('/patient/:id')
  updatePatientById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PatientEntity>,
    @Body('name') name: string,
  ): Promise<{ message: string; updatedPatient: PatientEntity }> {
    return this.adminService.updatePatientById(id, data, name);
  }

  //Salary

  @Put('/adminaddedpatients/:doctorid')
  updateSalaryByDoctorId(
    @Param('doctorid', ParseIntPipe) doctorId: number,
    @Body('salary', ParseIntPipe) salary: number,
  ): Promise<DoctorEntity> {
    return this.adminService.updateSalaryByDoctorId(doctorId, salary);
  }
  

  



  
  

}


