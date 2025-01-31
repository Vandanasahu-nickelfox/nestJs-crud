import { Injectable, HttpException } from '@nestjs/common';
import { CarModel } from './car.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable() //decorator to make service injectable -call it in controller
export class CarService {
  constructor(
    @InjectModel(CarModel) private readonly carModel: typeof CarModel,
  ) {} //injecting the

  public postCar(car): Promise<CarModel> {
    //passing car object which add this data to our cache which is cars //method to create data
    return this.carModel.create(car);
  }

  public async getCars(): Promise<CarModel[]> {
    //method to fetch data
    return await this.carModel.findAll();
  }

  public async getCarById(id: number): Promise<CarModel | null> {
    const car = await this.carModel.findByPk(id); //method to fetch data by i
    if (!car) {
      throw new HttpException('Car not found for the given ID', 404); // Return not found message
  }
  return car;
  }

  public async deleteCarById(id: number) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new HttpException('Car not found', 404); //if car not found
    }
    await car.destroy();

    return {
      message: 'Car deleted successfully',
      carId: id, 
  };
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<{ message: string; updatedCar: CarModel }> {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new HttpException('Car not found', 404); //if car not found
    }
    car[propertyName] = propertyValue;

    await car.save();

    return {
      message: `Car's ${propertyName} updated successfully`,  // Message returned to the client
      updatedCar: car,  // Updated car object
  };
  }
}
