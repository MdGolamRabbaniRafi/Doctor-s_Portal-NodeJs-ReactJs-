import { ReportService } from './../Services/report.service';
import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { SessionGuard } from "../session.guard";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ReportDto } from "../DTOs/report.dto";
import { EmailService } from '../Services/email.service';


@Controller('report')
export class ReportController{

    constructor(
        private readonly reportService: ReportService,
        private readonly emailService: EmailService
       
    ){}
    @Post('/add')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('testReport',{
        storage:diskStorage({
            destination:'./uploads/Reports',
            filename: function(req,file,cb){
                cb(null,Date.now()+file.originalname);
            }
        })
    }))
    addReport(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1600000 }),
            new FileTypeValidator({ fileType: 'pdf' }),
          ],
    }),) file:Express.Multer.File ,@Body() report:ReportDto){


      report.testReport=file.filename;
      const message="Dear Patient Your Test Report is uploaded, Your can now download it form the portal or also can collect it from the hospital "
      this.emailService.sendEmail(report.patientEmail,"Test Report",message)

       return this.reportService.addReport(report)
      
    }


    
    @Get('/all')
    @UseGuards(SessionGuard)
    allReports(){

       return this.reportService.allReports()
    }
    @Get('/get-report/:id')
    @UseGuards(SessionGuard)
   async getReport(@Param() id, @Res() res){
        const report= await this.reportService.getById(id);
        console.log(report);
        console.log(report);
        const name = await report.testReport
        
        res.sendFile(name,{root:'./uploads/Reports'})
      
    }
    @Get('/show/:id')
    @UseGuards(SessionGuard)
    getById(@Param() id){
      return this.reportService.getById(id)
      
    }



    @UseGuards(SessionGuard)
    @Put('/edit/:id')
    editReport(@Body() report,@Param() id) {

        return this.reportService.editReport(id,report)
    }
    @Delete('/delete/:id')
    @UseGuards(SessionGuard)
    deleteReport(@Param() id){

        return this.reportService.deleteReport(id)
    }
  
}