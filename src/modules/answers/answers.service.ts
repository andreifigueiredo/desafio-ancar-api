import { Injectable, Inject } from '@nestjs/common';
import { ANSWER_REPOSITORY } from 'src/core/constants';
import { Answer } from './answer.entity';
import { AnswerCreateDto } from './dto/answerCreate.dto';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(ANSWER_REPOSITORY) private readonly answerRepository: typeof Answer,
  ) {}

  async create(id, answer: AnswerCreateDto, userId): Promise<Answer> {
    return await this.answerRepository.create<Answer>({
      ...answer,
      userId,
      questionId: id,
    });
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.findAll<Answer>({});
  }

  async findAllByQuestion(id): Promise<Answer[]> {
    return await this.answerRepository.findAll<Answer>({
      where: { questionId: id },
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

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedAnswer]] =
      await this.answerRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedAnswer };
  }
}
