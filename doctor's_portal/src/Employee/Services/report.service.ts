import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportsEintiy } from "../Entites/report.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportsEintiy)
        private reportRepo:Repository<ReportsEintiy>
    ){}
    addReport(report){

        this.reportRepo.save(report)
    }

    allReports(){
        return this.reportRepo.find();
    }

    getById(id){

        return this.reportRepo.findOneBy({id:2});
    }

    editReport(id,data){

        const date=new Date();

        return this.reportRepo.update(id,{delivaryDate : date,isCollected:true});
    }
    deleteReport(id){
        return this.reportRepo.delete(id)
    }
}