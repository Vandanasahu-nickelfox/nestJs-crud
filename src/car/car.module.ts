import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarModel } from './car.model';
import { UserModel } from '../user/user.model';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [
    SequelizeModule.forFeature([CarModel, UserModel]),
    JwtModule.register({
      secret: 'your-secret-key', // Provide a secret for JWT (or use environment variables)
      signOptions: { expiresIn: '1h' }, // Example expiration time
    }),
  ],
  providers: [CarService],
  controllers: [CarController], 
  exports: [CarService],
})
export class CarModule {}
