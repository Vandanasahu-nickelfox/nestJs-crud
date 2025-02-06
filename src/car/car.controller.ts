import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get() // Get all cars
  public async getCars() {
    return this.carService.getCars();
  }

  @Post() // Create a new car
  public async postCar(@Body() car: CarDto) {
    // Log the incoming car data for debugging
    console.log('Received car data:', car);
    return this.carService.postCar(car);
  }

  @Get(':id') // Get car by ID
  public async getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Delete(':id') // Delete car by ID
  public async deleteCarById(@Param('id') id: number) {
    return this.carService.deleteCarById(id);
  }

  @Put(':id') // Update car by ID
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}

