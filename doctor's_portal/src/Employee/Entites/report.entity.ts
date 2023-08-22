import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportsEintiy{
    @PrimaryGeneratedColumn()
    id:number

    @Column({default:null})
    delivaryDate:Date

    @Column({default:false})
    isCollected:boolean

    @Column()
    patientemail:string

    @Column()
    paitinetPhone:string

    @Column()
    testReport:string

}