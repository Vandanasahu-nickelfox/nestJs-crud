import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from './car.model';

@Module({
    imports: [SequelizeModule.forFeature([CarModel])], // Car model to the SequelizeModule
    controllers: [CarController],
    providers: [CarService],
})
export class CarModule {}
