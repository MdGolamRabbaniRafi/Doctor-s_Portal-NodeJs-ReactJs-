import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Session, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, BadRequestException, ParseFloatPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDTO, AdminLoginDTO, NoticeDTO, ProfileDTO, SalaryDTO} from './admin.dto';
import { AddDocotorDTO, DoctorEntity } from '../Doctor/Doctor.dto';
import{AdminEntity} from './admin.entity';
import { PatientEntity, SignupPatientDTO } from 'src/Patient/Patient.dto';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoticeEntity } from './noticeBoard.entity';
import * as bcrypt from 'bcrypt';
import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { SalaryEntity } from './salary.entity';
import { NotificationEntity } from './notification.entity';
import { SessionGuard } from './session.guards';
import { Response } from 'express';
import session from 'express-session';
import { ProfileEntity } from './profile.entity';
import { plainToClass } from 'class-transformer';
import { join } from 'path';






@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  

  // @Get('/ViewMyProfile')
  // @UseGuards(SessionGuard)
  // ViewPersonalInfo(@Session() session): Object{
  //   return this.adminService.ViewPersonalInfo(session.email);

  // }

  @Put('/EditProfile')
  @UseGuards(SessionGuard)
  Edit(@Body() updateProfile: ProfileDTO,@Session() session): Object {
    return this.adminService.updateProfile(session.email, updateProfile);
    
  }



  @Put('/EditPass')
  @UseGuards(SessionGuard)
  EditPass(@Body() updatePass: AddAdminDTO,@Session() session): Object {
    return this.adminService.updatePass(session.email, updatePass);
    
  }

  @Get('/ViewMyProfile')
  @UseGuards(SessionGuard)
  ViewMyProfile(@Session() session): Promise<{ admin: AdminEntity }> {
    return this.adminService.ViewMyProfile(session.email);
  }


  @Post('/addProfile')
  @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    async addProfile(
      @Body() profileDTO: ProfileDTO,
      @Session() session,
      @UploadedFile() imageobj: Express.Multer.File
    ): Promise<ProfileDTO> {
      const email = session.email;
      profileDTO.filenames = imageobj.filename;
      const profile = await this.adminService.addProfile(profileDTO, email);
      return profile;
    }

  @Get('/myphoto')
  @UseGuards(SessionGuard)
  async showProfilePicture(@Session() session: any, @Res() res: Response): Promise<void> {
    try {
      const email: string = session.email;
      const filename: string = await this.adminService.getProfilePictureFilename(email);
      
      const filePath = join(__dirname, '..', '..', 'uploads', filename);
      
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  @Put('/changePicture')
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
        }
      },
      limits: { fileSize: 300000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = Date.now() + file.originalname;
          cb(null, fileName);
        },
      }),
    }),
  )
  async changePicture(
    @UploadedFile() file: Express.Multer.File,
    @Session() session,
  ): Promise<string> {
    const fileName = file.filename;
    return await this.adminService.changePicture(session.email, fileName);
  }

  


  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() admin: AddAdminDTO): Promise<string> {
    return this.adminService.signup(admin);
  }

    //Notification

    @Get('/notification')
    @UseGuards(SessionGuard)
    viewNotification(@Session() session): Promise<NotificationEntity[]> {
      return this.adminService.viewNotification(session.email);
    }
  
    // @Get('/ViewMyNotification')
    // @UseGuards(SessionGuard)
    // ViewMyNotification(@Session() session): Object{
    //   return this.adminService.ViewMyNotification(session.email);
  
    // }

    @Delete('/deletenotifications')
    @UseGuards(SessionGuard)
    async deleteAllNotifications(@Session() session): Promise<{ message: string; }> {
      return this.adminService.deleteAllNotification(session.email);
    
    }
    


@Post('/signin')
async signIn(@Body() data: AdminLoginDTO, @Session() session) {
  if (session.email == undefined) {
    const loginSuccess = await this.adminService.signIn(data);

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
  return this.adminService.Logout(session,session.email);


}



  // @Get('searchadminphotobyid/:adminId')
  // @UseGuards(SessionGuard)
  //   async getimagebyadminid(@Session() session, @Param('adminId', ParseIntPipe) adminId: number, @Res() res) {
  //       const filename = await this.adminService.getimagebyadminid(adminId, session.email);
  //       res.sendFile(filename, { root: './uploads' })

  //   }

  //DashBoard

  @Get("/dashboard")
  getDashboard():any {
      return this.adminService.getDashboard();
  }

 //Email

 @Post('/sendemail')
 async sendEmail(@Body() emailData: { to: string; subject: string; text: string }): Promise<void> {
   const { to, subject, text } = emailData;
   await this.adminService.sendEmail(to, subject, text);
 }

 //Notice Board



@Post('/addNotice')
@UseGuards(SessionGuard)
addNotice(@Body() notice: NoticeDTO,@Session() session): object {
  return this.adminService.addNotice(notice, session.email);
}



@Get('/viewallnotice')
@UseGuards(SessionGuard)
getAllNotice(): Promise<NoticeEntity[]|string> {
return this.adminService.getAllNotice();
}


@Get('/publicNotice')

publicNotice(): Promise<NoticeEntity[]|string> {

return this.adminService.publicNotice();
}




@Get('/noticebyadmin/:adminid')
viewNoticeByAdmin(@Param('adminid', ParseIntPipe) adminid: number): Promise<AdminEntity[]> {
  return this.adminService.viewNoticeByAdmin(adminid);
}

@Delete('/deletenotice')
deleteAllNotice(): object {
  return this.adminService.deleteAllNotice();
}

@Delete('/deletenotice/:sl')
@UseGuards(SessionGuard)
  deleteOneNotice(@Param('sl') sl: number): Promise<{ message: string }> {
    return this.adminService.deleteOneNotice(sl);
  }

 



  
//Doctor Section

@Post('/adddoctor')
@UseGuards(SessionGuard)
addDoctor(@Body() doctor: AddDocotorDTO,@Session() session): object {
  return this.adminService.addDoctor(doctor ,session.email);
}

  @Get('/viewallDoctor')
  @UseGuards(SessionGuard)
  async getAllDoctors(): Promise<DoctorEntity[] | string> {
    return this.adminService.getAllDoctors();
  }
  
  @Get('/Doctor/:id')
  @UseGuards(SessionGuard)
  async getDoctorById(@Param('id') id: number, @Session() session): Promise<object> {
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

  @Delete('/Doctor/:id')
  @UseGuards(SessionGuard)
  deleteDoctor(@Param('id') id: number, ): Promise<{ message: string }> {
    return this.adminService.deleteDoctorById(id);
  }
  

  @Put('/Doctor/:id')
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
  @UseGuards(SessionGuard)
  addPatient(@Body() patient: SignupPatientDTO, @Session() session): object {
    console.log(patient);
    return this.adminService.addPatient(patient, session.email);
  }

  @Get('/viewallPatient')
  @UseGuards(SessionGuard)
  async getAllPatient(): Promise<PatientEntity[]|string> {
    return this.adminService.getAllPatient();
  }

@Get('/Patient/:id')
@UseGuards(SessionGuard)
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

  @Delete('/Patient/:id')
  @UseGuards(SessionGuard)
  deletePatient(@Param('id') id: number, ): Promise<{ message: string }> {
    return this.adminService.deletePatientById(id);
  }
  

  @Put('/Patient/:id')
  updatePatientById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PatientEntity>,
    @Body('name') name: string,
  ): Promise<{ message: string; updatedPatient: PatientEntity }> {
    return this.adminService.updatePatientById(id, data, name);
  }

  // Appointment

  @Get('/viewallAppoinment')
  @UseGuards(SessionGuard)
  viewallAppoinment(): Promise<AppointmentEntity[]> {
  return this.adminService.viewallAppoinment();
}



  @Delete('/deleteappointment')
  deleteAllAppointment(): object {
    return this.adminService.deleteAllAppointment();
  }

  @Delete('/deleteappointment/:Serial')
  deleteAppointment(@Param('Serial', ParseIntPipe) Serial: number): Promise<{ message: string }> {
    return this.adminService.deleteAppointment(Serial);
  }

  //Salary



@Post('/addSalary')
addSalary(@Body('doctorId') doctorId: number, @Body('salary') salary: string): Promise<SalaryEntity> {
if (!doctorId) {
 throw new BadRequestException('Doctor ID is required');
}
const salaryEntity = new SalaryEntity();
salaryEntity.salary = salary;
salaryEntity.doctor = { id: doctorId } as DoctorEntity; 

return this.adminService.addSalary(salaryEntity);
}



  @Get('/viewalldoctorsalary')
  getAllDoctorSalary(): Promise<SalaryEntity[]> {
  return this.adminService.getAllDoctorSalary();
}

@Delete('/deleteSalary')
deleteAllSalary(): object {
  return this.adminService.deleteAllSalary();
}


@Put('/salary/:code')
updateSalarybycode(
  @Param('code', ParseIntPipe) code: number,
  @Body() data: Partial<SalaryEntity>,
  @Body('name') name: string,
): Promise<{ message: string; updatedSalary: SalaryEntity }> {
  return this.adminService.updateSalarybycode(code, data, name);
}


//Eid Bonus
@Put('/EidBonus')
updateEidSalary(): Promise<SalaryEntity[]> {
  return this.adminService.updateEidSalary();
}







  
  

}


