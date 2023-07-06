import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/Doctor.dto';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, DoctorEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}