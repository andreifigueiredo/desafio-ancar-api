import { Injectable, Inject } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';
import { QuizDto } from './dto/quiz.dto';
import { QUIZ_REPOSITORY } from '../../core/constants';
import { QuestionDto } from '../questions/dto/question.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizRepository: typeof Quiz,
    private readonly questionService: QuestionsService,
  ) {}

  async create(quiz: QuizDto, questions: QuestionDto[], userId): Promise<Quiz> {
    const newQuiz = await this.quizRepository.create<Quiz>({ ...quiz, userId });

    for (const question of questions) {
      await this.questionService.create(question, newQuiz.id);
    }
    return newQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.findAll<Quiz>({
      include: [{ model: Question }],
    });
  }

  async findOne(id): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id },
      include: [{ model: Question }],
    });
  }

  async delete(id, userId) {
    return await this.quizRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedQuiz]] =
      await this.quizRepository.update(
        { ...data },
        {
          where: { id, userId },
          returning: true,
        },
      );

    return { numberOfAffectedRows, updatedQuiz };
  }
}
