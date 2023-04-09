import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Answer } from '../answers/answer.entity';
import { Quiz } from '../quizzes/quiz.entity';

@Table
export class Question extends Model<Question> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @HasMany(() => Answer, {
    onDelete: 'CASCADE',
  })
  answers: Answer[];
}
