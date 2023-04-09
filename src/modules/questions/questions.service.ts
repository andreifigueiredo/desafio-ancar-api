import { Injectable, Inject } from '@nestjs/common';
import { Question } from './question.entity';
import { QUESTION_REPOSITORY } from 'src/core/constants';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: typeof Question,
  ) {}

  async create(question: QuestionDto, quizId): Promise<Question> {
    return await this.questionRepository.create<Question>({
      ...question,
      quizId,
    });
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.findAll<Question>({});
  }
}
