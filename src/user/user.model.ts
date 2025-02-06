import { Column, Model, PrimaryKey, AutoIncrement, Table, HasMany } from 'sequelize-typescript';
import { CarModel } from '../car/car.model';  // Ensure proper import

@Table
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  // One-to-Many Relationship (1 user can have multiple cars)
  @HasMany(() => CarModel)
  cars: CarModel[];  // This will create a relationship where each user can have multiple cars
}




