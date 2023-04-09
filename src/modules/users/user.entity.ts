import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Quiz } from '../quizzes/quiz.entity';

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  admin: boolean;

  @HasMany(() => Quiz, {
    onDelete: 'CASCADE',
  })
  quizzes: Quiz[];
}
