import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeesEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column({unique: true})
    email:string

    @Column({unique: true})
    phone:string

    @Column()
    password:string

    @Column({default:null})
    profilePicture:string
}