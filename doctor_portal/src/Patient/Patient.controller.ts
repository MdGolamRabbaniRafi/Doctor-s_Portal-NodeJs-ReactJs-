import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PatientService } from './Patient.service';
import { SignupPatientDTO,  PatientEntity,  } from './Patient.dto';

 

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
  @Put('/submitFeedback/:id')
  @UsePipes(new ValidationPipe())
  submitFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body('feedback') feedback: string,
  ): Promise<PatientEntity> {
    return this.patientService.submitFeedback(id, feedback);
  }

  @Put('/orderMedicine/:id')
@UsePipes(new ValidationPipe())
orderMedicine(
  @Param('id', ParseIntPipe) id: number,
  @Body('medicineOrder') medicineOrder: string,
): Promise<PatientEntity> {
  return this.patientService.orderMedicine(id, medicineOrder);
}
@Put('/editProfile/:id')
@UsePipes(new ValidationPipe())
editProfile(
  @Param('id', ParseIntPipe) id: number,
  @Body() updatedPatientData: Partial<PatientEntity>,
): Promise<PatientEntity> {
  return this.patientService.editProfile(id, updatedPatientData);
}
}



  
  

