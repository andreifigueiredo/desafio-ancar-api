import { Injectable, Inject } from '@nestjs/common';
import { ANSWER_REPOSITORY } from 'src/core/constants';
import { Question } from '../questions/question.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { QuizzesService } from '../quizzes/quizzes.service';
import { Answer } from './answer.entity';
import { AnswerCreateDto } from './dto/answerCreate.dto';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY)
    private readonly answerRepository: typeof Answer,
    private readonly quizzesService: QuizzesService,
  ) {}

  async create(answers: AnswerCreateDto[], userId): Promise<Answer[]> {
    const createdAnswers = [];
    for (const answer of answers) {
      createdAnswers.push(
        await this.answerRepository.create({ ...answer, userId }),
      );
    }

    return createdAnswers;
  }

  async findAllByQuiz(
    id: number,
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<Quiz> {
    const offset = (page - 1) * limit;

    const quiz = await this.quizzesService.findOne(id, {
      include: [
        {
          model: Question,
          include: [
            {
              model: Answer,
              where: userId ? { userId } : {},
              required: false,
            },
          ],
        },
      ],
      offset,
      limit,
    });

    return quiz;
  }

  async delete(id) {
    return await this.answerRepository.destroy({ where: { id } });
  }

  async update(answers, userId) {
    const updatedAnswers = [];
    let numberOfAffectedAnswersRows = 0;
    for (const answer of answers) {
      const [numberOfAffectedRows, [updatedAnswer]] =
        await this.answerRepository.update(
          { ...answer },
          {
            where: { id: answer.id, userId },
            returning: true,
          },
        );

      updatedAnswers.push(updatedAnswer);
      numberOfAffectedAnswersRows += numberOfAffectedRows;
    }

    return { numberOfAffectedAnswersRows, updatedAnswers };
  }
}
