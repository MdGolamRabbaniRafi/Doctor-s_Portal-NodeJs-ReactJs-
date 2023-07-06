import { Module } from '@nestjs/common';
import { DoctorModule } from './Doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DoctorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'Doctor_info',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
