import { IsEmail, IsString, Matches } from "class-validator";
import { AdminEntity } from "src/Admin/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("Notice Board")
export class NoticeEntity {
  @PrimaryGeneratedColumn()
  sl: number;

  @Column()
  @IsString({ message: "invalid name" })
  subject: string;

  @Column()
  @IsString({ message: "invalid message" })
  message: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postedTime: Date;

  @ManyToOne(() => AdminEntity, admin => admin.notice)
  admin: AdminEntity;
}
