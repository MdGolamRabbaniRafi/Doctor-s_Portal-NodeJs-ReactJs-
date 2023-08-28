import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Session, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { DoctorService } from './Doctor.service';
import { AddDocotorDTO, DoctorEntity, LoginDTO } from './Doctor.dto';
import { AppointmentEntity } from './appointment.entitiy';
import { SessionGuard } from './Session.gaurd';
import { NotificationEntity } from './Notification.entity';
import { Article, ArticleEntity } from './article.entity';
import {  ReferEntity } from './refer.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  addDoctor(@Body() doctor: AddDocotorDTO): Promise<string> {
    return this.doctorService.addDoctor(doctor);
  }

  @Get('/ViewProfile/:email')
  @UseGuards(SessionGuard)
  ViewProfile(@Param('email') email: string): Object {
    return this.doctorService.ViewProfile(email);
  }
  

  @Put('/Edit')
  @UseGuards(SessionGuard)
  Edit(@Body() updateDoctor: AddDocotorDTO,@Session() session): Object {
    return this.doctorService.Edit(session.email, updateDoctor);
    
  }

  @Get('/Searching/:id')
  @UseGuards(SessionGuard)
  Searching(@Param('id') id: string,@Session() session): Object {
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
    console.log("Received appointment data:", appointment);
    return this.doctorService.addAppointment(appointment,session.email);
  }

  @Get('/viewAppointment')
  viewAppointment(@Session() session): Promise<DoctorEntity[]> {
    return this.doctorService.viewAppointment(session.email);
  }
  
  @Get('/viewArticle')
  viewArticle(): Promise<ArticleEntity[]> {
    return this.doctorService.viewArticle();
  }
  @Get('/notification')
@UseGuards(SessionGuard)
  viewNotification(@Session() session): Promise<NotificationEntity[]> {
    return this.doctorService.viewNotification(session.email);
  }

  @Delete('/deleteAllAppointment')
@UseGuards(SessionGuard)
  deleteAllAppointments(@Session() session): Promise<String> {
    return this.doctorService.deleteAllAppointments(session.email);
  }

  @Delete('/deleteOneAppointment/:serial')
  @UseGuards(SessionGuard)
  deleteOneAppointment(
    @Session() session,
    @Param('serial', ParseIntPipe) serial: number,
  ): Promise<String> {
    return this.doctorService.deleteOneAppointment(session.email, serial);
  }

  @Put('/updateAppointment/:appointmentId')
  @UseGuards(SessionGuard)
  updateAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,@Session() session,
    @Body() Data: AppointmentEntity,
  ): Promise<AppointmentEntity|null|String> {
    return this.doctorService.updateAppointment(session.email,appointmentId, Data);
  }
  
  @Post('/signin')
  async signIn(@Body() data: LoginDTO, @Session() session) {
    if (session.email == undefined) {
      const loginSuccess = await this.doctorService.signIn(data);
  
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
  
  
  @Post('/logout')
  //@UseGuards(SessionGuard)
  async logout(@Session() session) {
    return this.doctorService.Logout(session,session.email);
  
  }

  @Post('/uploadPicture')
@UseGuards(SessionGuard)
@UseInterceptors(
  FileInterceptor('DoctorPicture', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
      }
    },
    limits: { fileSize: 300000 },
    storage: diskStorage({
      destination: './DoctorFiles',
      filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname;
        cb(null, fileName);
      },
    }),
  }),
)
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Session() session,
): Promise<string> {
  const fileName = file.filename;
  return await this.doctorService.uploadFile(session.email, fileName);
}




@Put('/changePicture')
@UseGuards(SessionGuard)
@UseInterceptors(
  FileInterceptor('DoctorPicture', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
      }
    },
    limits: { fileSize: 300000 },
    storage: diskStorage({
      destination: './DoctorFiles',
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
  return await this.doctorService.changePicture(session.email, fileName);
}





@Post('/uploadDefaultPicture/:email')
@UseInterceptors(
  FileInterceptor('DoctorPicture', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        cb(null, true);
      } else {
        cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
      }
    },
    limits: { fileSize: 300000 },
    storage: diskStorage({
      destination: './DoctorFiles',
      filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname;
        cb(null, fileName);
      },
    }),
  }),

)
async uploadDefaultPicture(
  @UploadedFile() DoctorPicture: Express.Multer.File,  @Param('email') email: string

): Promise<string> {
  const fileName = DoctorPicture.filename;
  return await this.doctorService.uploadDefaultPicture(email, fileName);
}



  

  @Get('/viewProfilePicture')
  @UseGuards(SessionGuard)
  getImages( @Session() session, @Res() res) {
    return this.doctorService.getImages(session.email, res);
  }

  @Post('/sendEmail')
  @UseGuards(SessionGuard)
  async sendEmail(@Session() session,@Body() emailData: { to: string; subject: string; text: string }): Promise<String> {
    return await this.doctorService.sendEmail(session.email,emailData);
  }
  @Get('/ChechEmailHistory')
  @UseGuards(SessionGuard)
  checkEmailHistory( @Session() session,) {
    return this.doctorService.checkEmailHistory(session.email);
  }
  @Get('/searchUser/:email')
  async searchUser(@Param('email') email: string): Promise<string> {
    const userType = await this.doctorService.searchUser(email);
    return userType;
  }


  

}
