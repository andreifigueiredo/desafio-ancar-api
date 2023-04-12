import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Question } from '../questions/question.entity';

@Table
export class Quiz extends Model<Quiz> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Question, {
    onDelete: 'CASCADE',
  })
  questions: Question[];
}
