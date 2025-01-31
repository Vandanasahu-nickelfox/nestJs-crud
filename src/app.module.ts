import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { CarModel } from './car/car.model';

dotenv.config();

@Module({
  imports: [CarModule,
    SequelizeModule.forRoot({
      dialect: 'postgres', // PostgreSQL database
      host: process.env.DB_HOST, // Load the host from .env
      port: parseInt(process.env.DB_PORT || '5432', 10), // Load the port from .env
      username: process.env.DB_USER, // Load username from .env
      password: process.env.DB_PASS, // Load password from .env
      database: process.env.DB_NAME, // Load database name from .env
      models: [CarModel], // Add your Sequelize models here
      autoLoadModels: true, // Automatically load models (for development)
      synchronize: true, // Synchronize the models with the database (use with caution in production)
    }),
  ], 

})
export class AppModule {}

