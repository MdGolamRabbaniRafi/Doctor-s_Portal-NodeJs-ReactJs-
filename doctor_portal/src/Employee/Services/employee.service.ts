import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeesEntity } from "../Entites/employee.entity";
import * as bcrypt from 'bcrypt';
import { AppointmentEntity } from "src/Doctor/appointment.entitiy";


@Injectable()
export class EmployeeService {
  
    constructor(
        @InjectRepository(EmployeesEntity)
        private employeeRepo:Repository<EmployeesEntity>,
        @InjectRepository(AppointmentEntity)
        private appointmentRepo:Repository<AppointmentEntity>
    ){}
    
   async addEmployee(employee){

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(employee.password, 10);
        employee.password = hashedPassword
        return this.employeeRepo.save(employee);
    }
    getEmployeeById(id){

        return this.employeeRepo.findOne(id);
    }
    editEmployee(id,employee){

        return this.employeeRepo.update(id,employee)
    }
    async login(employee){

        const salt = await bcrypt.genSalt();
   
    const user= await this.employeeRepo.findOneBy({email:employee.email});
    if (user != null){
      const isMatch = await bcrypt.compare(employee.password, user.password);
      if(isMatch ) {
        return {user:user}
      }
      else{
        return {passErr:"Iincorrect Password"}
      }
    }

    else{
      return {emailErr:"Iincorrect Email"} ;
    }
    }



   async deleteAppointment(id){
    const appointment = await this.appointmentRepo.findOne({
      where: { Serial: id},
    });
   return await this.appointmentRepo.remove(appointment);
    }

    
         

}