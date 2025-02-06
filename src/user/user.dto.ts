// user.dto.ts

import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}


  