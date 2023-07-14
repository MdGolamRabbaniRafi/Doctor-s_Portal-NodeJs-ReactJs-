import { IsNotEmpty } from "class-validator";

export class ReportDto{

    

    @IsNotEmpty()
    patientEmail: string;

    @IsNotEmpty()
    patientPhone: string;

    testReport:any

    
}