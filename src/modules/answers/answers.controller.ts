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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Answer as AnswerEntity } from '../answers/answer.entity';
import { AnswersService } from '../answers/answers.service';
import { AnswerCreateDto } from './dto/answerCreate.dto';

const doesNotExistMessage = 'Resposta não encontrada';

@Controller('quizzes')
@ApiTags('quizzes')
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id/answers')
  async findAllAnswers(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Request() req,
  ) {
    const quiz = await this.answerService.findAllByQuiz(
      id,
      req.user.id,
      page,
      limit,
    );

    return quiz;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':id/answers')
  async create(
    @Param('id') id: number,
    @Body() answers: AnswerCreateDto[],
    @Request() req,
  ): Promise<AnswerEntity[]> {
    return await this.answerService.create(answers, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/answers')
  async update(
    @Param('id') id: number,
    @Body() answers: AnswerCreateDto[],
    @Request() req,
  ): Promise<AnswerEntity[]> {
    const { numberOfAffectedAnswersRows, updatedAnswers } =
      await this.answerService.update(answers, req.user.id);

    if (numberOfAffectedAnswersRows === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return updatedAnswers;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id/answers/:answerId')
  async remove(@Param('answerId') id: number) {
    const deleted = await this.answerService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return 'Successfully deleted';
  }
}
