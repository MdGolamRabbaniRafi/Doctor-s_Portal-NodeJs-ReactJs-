import { IsEmail, IsString, Matches } from "class-validator";
import { AdminEntity } from "src/Admin/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";






@Entity("Notice Board")
export class NoticeEntity {
  @PrimaryGeneratedColumn()
  sl: number;

  @Column()
  @IsString({ message: "invalid Subject" })
  subject: string;

  @Column()
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'Invalid message format' })
  message: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', transformer: {
    to: (value: Date) => value,
    from: (value: string) => new Date(value),
  }})
  postedTime: Date;

  @ManyToOne(() => AdminEntity, admin => admin.notice)
  admin: AdminEntity;
}
