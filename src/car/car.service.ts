// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { CarModel } from './car.model';
// import { CarDto } from './car.dto';
// import { UserModel } from '../user/user.model'; // Import UserModel directly

// @Injectable()
// export class CarService {
//   constructor(
//     @InjectModel(CarModel) private readonly carModel: typeof CarModel,
//     @InjectModel(UserModel) private readonly userModel: typeof UserModel, // Inject UserModel directly
//   ) {}

//   public async postCar(carDto: CarDto): Promise<CarModel> {
//     try {
//       console.log('Received car data:', carDto);

//       // Validate userId exists in the UserModel
//       const userExists = await this.userModel.findByPk(carDto.userId); // Use the injected userModel

//       if (!userExists) {
//         console.error(`User with ID ${carDto.userId} does not exist.`);
//         throw new Error(`User with ID ${carDto.userId} does not exist.`);
//       }

//       // Exclude 'id' and only insert relevant fields
//       const carData = {
//         brand: carDto.brand,
//         model: carDto.model,
//         color: carDto.color,
//         userId: carDto.userId,
//       };

//       console.log('Car data to be inserted:', carData);

//       // Sequelize will auto-generate the 'id' field
//       const newCar = await this.carModel.create(carData);

//       console.log('New car created:', newCar);
//       return newCar;
//     } catch (error) {
//       console.error('Error creating car:', error);
//       throw new Error(`Error while creating car: ${error.message}`);
//     }
//   }

//   // Get all cars
//   public async getCars(): Promise<CarModel[]> {
//     return this.carModel.findAll();
//   }

//   // Get car by ID
//   public async getCarById(id: number): Promise<CarModel | null> {
//     return this.carModel.findByPk(id);
//   }

//   // Delete car by ID
//   public async deleteCarById(id: number) {
//     const car = await this.carModel.findByPk(id);
//     if (!car) {
//       throw new Error('Car not found');
//     }
//     await car.destroy();
//     return { message: 'Car deleted successfully', carId: id };
//   }

//   // Update car properties by ID
//   public async putCarById(
//     id: number,
//     propertyName: string,
//     propertyValue: string,
//   ): Promise<{ message: string; updatedCar: CarModel }> {
//     const car = await this.carModel.findByPk(id);
//     if (!car) {
//       throw new Error('Car not found');
//     }
//     car[propertyName] = propertyValue;
//     await car.save();
//     return { message: `Car's ${propertyName} updated`, updatedCar: car };
//   }
// }




import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './car.model';
import { CarDto } from './car.dto';
import { UserModel } from '../user/user.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModel) private readonly carModel: typeof CarModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  // Create a new car
  public async postCar(carDto: CarDto): Promise<CarModel> {
    try {
      console.log('Received car data:', carDto);

      const userExists = await this.userModel.findByPk(carDto.userId);
      if (!userExists) {
        throw new HttpException(
          `User with ID ${carDto.userId} does not exist.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const carData = {
        brand: carDto.brand,
        model: carDto.model,
        color: carDto.color,
        userId: carDto.userId,
      };

      // Sequelize will auto-generate the 'id' field
      const newCar = await this.carModel.create(carData);
      console.log('New car created:', newCar);
       
      return newCar;
    } catch (error) {
      console.error('Error creating car:', error); 
      throw new HttpException(
        `Error while creating car: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all cars
  public async getCars(): Promise<CarModel[]> {
    try {
      return await this.carModel.findAll();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw new HttpException('Error fetching cars', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get car by ID
  public async getCarById(id: number): Promise<CarModel | null> {
    try {
      const car = await this.carModel.findByPk(id);
      if (!car) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }
      return car;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }

  // Delete car by ID
  public async deleteCarById(id: number) {
    try {
      const car = await this.carModel.findByPk(id);
      if (!car) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }
      await car.destroy();
      return { message: 'Car deleted successfully', carId: id };
    } catch (error) {
      console.error('Error deleting car:', error);
      throw new HttpException('Error deleting car', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update car properties by ID
  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<{ message: string; updatedCar: CarModel }> {
    try {
      const car = await this.carModel.findByPk(id);
      if (!car) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }
      car[propertyName] = propertyValue;
      await car.save();
      return { message: `Car's ${propertyName} updated`, updatedCar: car };
    } catch (error) {
      console.error('Error updating car:', error);
      throw new HttpException('Error updating car', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}






