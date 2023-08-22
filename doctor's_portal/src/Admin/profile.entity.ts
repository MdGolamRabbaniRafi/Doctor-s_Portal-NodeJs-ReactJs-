import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity("Profile")
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  education: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  experience: string;


  @OneToOne(() => AdminEntity, admin => admin.profile)
  @JoinColumn()
  admin: AdminEntity;
}

