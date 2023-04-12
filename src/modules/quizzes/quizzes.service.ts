import { Injectable, Inject } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { plainToClass } from 'class-transformer';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';
import { QUIZ_REPOSITORY } from '../../core/constants';
import { QuestionsService } from '../questions/questions.service';
import { QuizCreateDto } from './dto/quizCreate.dto';
import { QuizUpdateDto } from './dto/quizUpdate.dto';
import { QuizWithQuestionsCreateDto } from './dto/quizWithQuestionsCreate.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizRepository: typeof Quiz,
    private readonly questionService: QuestionsService,
  ) {}

  async create(quizWithQuestions: QuizWithQuestionsCreateDto): Promise<Quiz> {
    const quiz: QuizCreateDto = plainToClass(QuizCreateDto, quizWithQuestions);
    const newQuiz = await this.quizRepository.create<Quiz>({ ...quiz });

    for (const question of quizWithQuestions.questions) {
      await this.questionService.create(question, newQuiz.id);
    }
    return newQuiz;
  }

  async findAll(page = 1, limit = 10): Promise<Quiz[]> {
    const offset = (page - 1) * limit;

    return await this.quizRepository.findAll<Quiz>({
      include: [{ model: Question }],
      offset,
      limit,
    });
  }

  async findOne(id: number, options?: FindOptions): Promise<Quiz> {
    if (!options) {
      options = {
        include: [{ model: Question }],
      };
    }
    return await this.quizRepository.findOne({
      where: { id },
      ...options,
    });
  }

  async delete(id) {
    return await this.quizRepository.destroy({ where: { id } });
  }

  async update(id, quizWithQuestions) {
    const quiz: QuizUpdateDto = plainToClass(QuizUpdateDto, quizWithQuestions);
    const [numberOfAffectedRows, [updatedQuiz]] =
      await this.quizRepository.update(
        { ...quiz },
        {
          where: { id },
          returning: true,
        },
      );

    if (!quizWithQuestions.questions) {
      return { numberOfAffectedRows, updatedQuiz };
    }

    for (const question of quizWithQuestions.questions) {
      if (question?.id) {
        await this.questionService.update(question.id, { ...question });
      } else {
        await this.questionService.create(question, id);
      }
    }

    return { numberOfAffectedRows, updatedQuiz };
  }
}
