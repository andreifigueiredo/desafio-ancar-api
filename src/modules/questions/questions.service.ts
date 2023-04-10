import { Injectable, Inject } from '@nestjs/common';
import { Question } from './question.entity';
import { QUESTION_REPOSITORY } from 'src/core/constants';
import { QuestionCreateDto } from './dto/questionCreate.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: typeof Question,
  ) {}

  async create(question: QuestionCreateDto, quizId): Promise<Question> {
    return await this.questionRepository.create<Question>({
      ...question,
      quizId,
    });
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.findAll<Question>({});
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedQuestion]] =
      await this.questionRepository.update(
        { ...data },
        {
          where: { id },
          returning: true,
        },
      );

    return { numberOfAffectedRows, updatedQuestion };
  }
}
