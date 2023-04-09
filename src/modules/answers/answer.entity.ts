import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from '../questions/question.entity';
import { User } from '../users/user.entity';

@Table
export class Answer extends Model<Answer> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
