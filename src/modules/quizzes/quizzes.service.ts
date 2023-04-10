import { Injectable, Inject } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';
import { QuizDto } from './dto/quiz.dto';
import { QUIZ_REPOSITORY } from '../../core/constants';
import { QuestionsService } from '../questions/questions.service';
import { QuizWithQuestionsDto } from './dto/quizWithQuestions.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private readonly quizRepository: typeof Quiz,
    private readonly questionService: QuestionsService,
  ) {}

  async create(quizWithQuestion: QuizWithQuestionsDto, userId): Promise<Quiz> {
    const quiz: QuizDto = plainToClass(QuizDto, quizWithQuestion);
    const newQuiz = await this.quizRepository.create<Quiz>({ ...quiz, userId });

    for (const question of quizWithQuestion.questions) {
      await this.questionService.create(question, newQuiz.id);
    }
    return newQuiz;
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.findAll<Quiz>({
      include: [{ model: Question }],
    });
  }

  async delete(id, userId) {
    return await this.quizRepository.destroy({ where: { id, userId } });
  }

  async update(id, quizWithQuestion, userId) {
    const quiz: QuizDto = plainToClass(QuizDto, quizWithQuestion);
    const [numberOfAffectedRows, [updatedQuiz]] =
      await this.quizRepository.update(
        { ...quiz },
        {
          where: { id, userId },
          returning: true,
        },
      );

    for (const question of quizWithQuestion.questions) {
      if (question?.id) {
        await this.questionService.update(question.id, { ...question });
      } else {
        await this.questionService.create(question, id);
      }
    }

    return { numberOfAffectedRows, updatedQuiz };
  }
}
