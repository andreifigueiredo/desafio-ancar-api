import { Injectable, Inject } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { User } from '../users/user.entity';
import { QuizDto } from './dto/quiz.dto';
import { QUIZ_REPOSITORY } from '../../core/constants';

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY) private readonly quizRepository: typeof Quiz,
  ) {}

  async create(quiz: QuizDto, userId): Promise<Quiz> {
    return await this.quizRepository.create<Quiz>({ ...quiz, userId });
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.findAll<Quiz>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.quizRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedQuiz]] =
      await this.quizRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedQuiz };
  }
}
