import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable() //decorator to make service injectable -call it in controller
export class CarService {
  private cars = CARS; //dummy data catched from cars.mock.ts

  public postCar(car) {//passing car object which add this data to our cache which is cars //method to create data
    return this.cars.push(car);
  }

  public getCars() {
    //method to fetch data
    return this.cars;
  }

  public getCarById(id: number): Promise<any> {
    const cardId = Number(id);

    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === cardId); //method to fetch data by id
      if (!car) {
        throw new HttpException('Car not found', 404); //if car not found
      }
      return resolve(car);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const cardId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === cardId);
      if (index === -1) {
        throw new HttpException('Car not found', 404); //if car not found
      }
      this.cars.splice(index, 1);
      return resolve(this.cars);
    });
  }

  public putCarById(id: number, propertyName: string, propertyValue: string): Promise<any> {
    const cardId = Number(id);
    return new Promise((resolve) => {
    const index = this.cars.findIndex((car) => car.id === cardId);
    if (index === -1) {
      throw new HttpException('Car not found', 404); //if car not found
    }
    this.cars[index][propertyName] = propertyValue;

    return resolve (this.cars);
  });
  }
}
