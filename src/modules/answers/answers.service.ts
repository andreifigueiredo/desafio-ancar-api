import { Injectable, Inject } from '@nestjs/common';
import { ANSWER_REPOSITORY } from 'src/core/constants';
import { Question } from '../questions/question.entity';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY) private readonly answerRepository: typeof Answer,
  ) {}

  async create(answer: Answer, userId, questionId): Promise<Answer> {
    return await this.answerRepository.create<Answer>({
      ...answer,
      userId,
      questionId,
    });
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.findAll<Answer>({});
  }

  async findAllByQuiz(id): Promise<Answer[]> {
    return await this.answerRepository.findAll<Answer>({
      include: [
        {
          model: Question,
          attributes: [],
          where: { quizId: id },
        },
      ],
    });
  }

  async findOne(id): Promise<Answer> {
    return await this.answerRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.answerRepository.destroy({ where: { id } });
  }

  async update(id, data, userId, questionId) {
    const [numberOfAffectedRows, [updatedAnswer]] =
      await this.answerRepository.update(
        { ...data },
        { where: { id, userId, questionId }, returning: true },
      );

    return { numberOfAffectedRows, updatedAnswer };
  }
}
