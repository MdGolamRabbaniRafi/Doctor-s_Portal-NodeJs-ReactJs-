import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DoctorEntity } from "./Doctor.dto";
import { IsEmpty, IsInt } from "class-validator";


export class Article {
  @IsEmpty({ message: "invalid name" })
  name: string;

  @IsEmpty({ message: "invalid Link" })
  Link: string;
}
@Entity("Article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  Serial: number;

  @Column({ name: 'Article_Name', type: "varchar", length: 150 })
  name: string;

  @Column()
  Link: String;

  @Column()
  Publish_date: string;

  @Column({ type: "varchar", length: 150 })
  Publish_time: string;

  @ManyToOne(() => DoctorEntity, doctor => doctor.article)
  doctor: DoctorEntity;


}
