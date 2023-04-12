import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Answer } from '../answers/answer.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpf: string;

  @HasMany(() => Answer, {
    onDelete: 'CASCADE',
  })
  answers: Answer[];
}
