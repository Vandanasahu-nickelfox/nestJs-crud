import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';  // Import the User model

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),  // Include User model in SequelizeModule
    JwtModule.register({
      secret: 'your-secret-key', // Provide a secret for JWT (consider using environment variables)
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration time
    }),
  ],
  controllers: [UserController],  // Register UserController
  providers: [UserService],  // Register UserService
})
export class UserModule {}
