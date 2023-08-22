import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeDto } from '../DTOs/employee.dto';
import { SessionGuard } from '../session.guard';
import { EmailService } from '../Services/email.service';
import { DoctorService } from 'src/Doctor/Doctor.service';

@Controller('/employee')
export class EmployeeController {
  constructor(
    private readonly emaployeeService: EmployeeService,
    private readonly emailService: EmailService,
    private readonly doctorService: DoctorService,
  ) {}

  @Post('/add')
  addEmployee(@Body() employee: EmployeeDto) {
    return this.emaployeeService.addEmployee(employee);
  }

  @Get('/details')
  @UseGuards(SessionGuard)
  getEmployeeById(@Session() mysession) {
    return this.emaployeeService.getEmployeeById(mysession.userId);
  }
  @Put('/edit/:id')
  editEmployee(
    @Body() employee: EmployeeDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.emaployeeService.editEmployee(id, employee);
  }

  @Get('/login')
  async login(@Session() mysession, @Body() employee) {
    try {
      const user = await this.emaployeeService.login(employee);

      //     mysession.userId=user.user.id;
      //     mysession.userEmail=user.user.email;
      //    console.log(mysession.userEmail);
      return user;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Login failed',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }

  //     @Delete('/apopointment/delete/:id')
  //    async deleteAppointment(@Param('id',ParseIntPipe) id:number,@Body() data){

  //     // this.emaployeeService.deleteAppointment(id)
  //     //     const message="Dear Patient Appointment has been cancelled "
  //     //   return  this.emailService.sendEmail(data.eamil,"Appointment",message)
  //     }
}
