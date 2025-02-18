// app.module.ts
import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module'; // Import the User module
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { CarModel } from './car/car.model';
import { UserModel } from './user/user.model';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    CarModule,
    UserModule, 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [CarModel, UserModel],
      autoLoadModels: true,
      synchronize: true,
    }), AuthModule,
  ],
})
export class AppModule {}


