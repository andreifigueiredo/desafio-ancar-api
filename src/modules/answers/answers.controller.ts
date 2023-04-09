import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Answer as AnswerEntity } from '../answers/answer.entity';
import { answersProviders } from '../answers/answers.provider';
import { AnswersService } from '../answers/answers.service';

@Controller('quizzes')
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/answers')
  async findAllAnswers(@Param('id') id: number) {
    const answers = await this.answerService.findAllByQuiz(id);

    return answers;
  }
}
