import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';  // Import the User model

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),  // Include User model in SequelizeModule
  ],
  controllers: [UserController],  // Register UserController
  providers: [UserService],  // Register UserService
})
export class UserModule {}
