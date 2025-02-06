import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarModel } from './car.model';
import { UserModel } from '../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([CarModel, UserModel])],
  providers: [CarService],
  controllers: [CarController], 
  exports: [CarService],
  
})
export class CarModule {}
