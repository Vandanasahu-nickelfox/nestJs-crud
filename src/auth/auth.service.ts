import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = []; // Ensure users array is correctly typed

  constructor(private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { email, password: hashedPassword };
    this.users.push(newUser);
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ email: user.email });
    return { access_token: token };
  }
}

