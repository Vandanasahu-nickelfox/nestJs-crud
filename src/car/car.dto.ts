import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  userId: number;  // Make sure to validate the userId
}



