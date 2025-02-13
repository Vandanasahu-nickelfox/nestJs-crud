import { Column, Model, PrimaryKey, AutoIncrement, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from '../user/user.model';  // Import UserModel for relationship

@Table({ tableName: 'cars' })
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

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })  // Explicitly use the correct column name
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}





