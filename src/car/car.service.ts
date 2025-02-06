import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './car.model';
import { CarDto } from './car.dto';
import { UserModel } from '../user/user.model'; // Import UserModel directly

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModel) private readonly carModel: typeof CarModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel, // Inject UserModel directly
  ) {}

  public async postCar(carDto: CarDto): Promise<CarModel> {
    try {
      console.log('Received car data:', carDto);

      // Validate userId exists in the UserModel
      const userExists = await this.userModel.findByPk(carDto.userId); // Use the injected userModel

      if (!userExists) {
        console.error(`User with ID ${carDto.userId} does not exist.`);
        throw new Error(`User with ID ${carDto.userId} does not exist.`);
      }

      // Exclude 'id' and only insert relevant fields
      const carData = {
        brand: carDto.brand,
        model: carDto.model,
        color: carDto.color,
        userId: carDto.userId,
      };

      console.log('Car data to be inserted:', carData);

      // Sequelize will auto-generate the 'id' field
      const newCar = await this.carModel.create(carData);

      console.log('New car created:', newCar);
      return newCar;
    } catch (error) {
      console.error('Error creating car:', error);
      throw new Error(`Error while creating car: ${error.message}`);
    }
  }

  // Get all cars
  public async getCars(): Promise<CarModel[]> {
    return this.carModel.findAll();
  }

  // Get car by ID
  public async getCarById(id: number): Promise<CarModel | null> {
    return this.carModel.findByPk(id);
  }

  // Delete car by ID
  public async deleteCarById(id: number) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new Error('Car not found');
    }
    await car.destroy();
    return { message: 'Car deleted successfully', carId: id };
  }

  // Update car properties by ID
  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<{ message: string; updatedCar: CarModel }> {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new Error('Car not found');
    }
    car[propertyName] = propertyValue;
    await car.save();
    return { message: `Car's ${propertyName} updated`, updatedCar: car };
  }
}

