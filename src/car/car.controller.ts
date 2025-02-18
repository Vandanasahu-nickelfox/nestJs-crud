import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'; // Import JwtAuthGuard

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get() 
  @UseGuards(JwtAuthGuard) // Protect the getCars route
  public async getCars() {
    try {
      return await this.carService.getCars();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw new HttpException('Error fetching cars', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post() 
  @UseGuards(JwtAuthGuard) // Protect the postCar route
  public async postCar(@Body() car: CarDto) {
    try {
      return await this.carService.postCar(car);
    } catch (error) {
      console.error('Error creating car:', error);
      throw new HttpException(
        `Error while creating car: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id') 
  public async getCarById(@Param('id') id: number) {
    try {
      return await this.carService.getCarById(id);
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id') 
  @UseGuards(JwtAuthGuard) // Protect the deleteCarById route
  public async deleteCarById(@Param('id') id: number) {
    try {
      return await this.carService.deleteCarById(id);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw new HttpException('Car not found or error deleting', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id') // Update car by ID
  @UseGuards(JwtAuthGuard) // Protect the putCarById route
  public async putCarById(@Param('id') id: number, @Query() query) {
    try {
      const propertyName = query.property_name;
      const propertyValue = query.property_value;
      return await this.carService.putCarById(id, propertyName, propertyValue);
    } catch (error) {
      console.error('Error updating car:', error);
      throw new HttpException('Error updating car', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

