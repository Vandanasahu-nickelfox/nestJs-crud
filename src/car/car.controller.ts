import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service'; //import the service hat contains the logic for fetching data (in this case, data about cars).
import { CarDto } from './car.dto';
// import { query } from 'express';

@Controller('car')
export class CarController {
  //first thing inject the service
  constructor(private carService: CarService) {}

  //end points method- inside controller

  @Get() //inside this paranthesis we can pass the route/subroute
  //empty paranthesid means just calling get method on this car route
  public  getCars() {
    return this.carService.getCars(); //call the service method

    //Using await: You would use await if you need to perform operations on the resolved result of the Promise
    // before returning it (e.g., manipulate data, error handling).
    // Without await: If you're simply returning the Promise as it is (like in the example), there's no need
    // for await because async already wraps the method in a Promise, and NestJS is fine handling that Promise return.
  }

  @Post()
  public postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Delete(':id')
public async deleteCarById(@Param('id') id: number) {
  const result = await this.carService.deleteCarById(id);
  
  if (result) {
    return { message: 'Deleted successfully' };
  } else {
    return { message: 'Car not found' };
  }
}


  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
