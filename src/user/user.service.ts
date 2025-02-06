import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UserDto } from './user.dto';
import { CarModel } from '../car/car.model'; // Import CarModel (for use in query)

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async getUsers(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  async createUser(userDto: UserDto): Promise<UserModel> {
    const { name, email } = userDto;
    return this.userModel.create({
      name,
      email,
    });
  }

  // Fetch user by ID and include their cars
  async getUserById(id: number): Promise<UserModel | null> {
    return this.userModel.findOne({
      where: { id },  // Find user by ID
      include: [CarModel],  // Include associated cars
    });
  }
}








