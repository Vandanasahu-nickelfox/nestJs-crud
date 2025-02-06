import { Column, Model, PrimaryKey, AutoIncrement, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from '../user/user.model';  // Import UserModel for relationship

@Table
export class CarModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  brand: string;

  @Column
  model: string;

  @Column
  color: string;

  @ForeignKey(() => UserModel)  // Foreign key to UserModel
  @Column
  userId: number;

  @BelongsTo(() => UserModel)  // This sets the reverse of HasMany in UserModel
  user: UserModel; // This allows you to reference the user directly from a car instance
}




