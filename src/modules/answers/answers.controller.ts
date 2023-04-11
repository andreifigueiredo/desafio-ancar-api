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

@Controller('questions')
@ApiTags('questions')
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id/answers')
  async findAllAnswers(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const answers = await this.answerService.findAllByQuestion(id, page, limit);

    return answers;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':id/answers')
  async create(
    @Param('id') id: number,
    @Body() answer: AnswerCreateDto,
    @Request() req,
  ): Promise<AnswerEntity> {
    return await this.answerService.create(id, answer, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/answers/:answerId')
  async update(
    @Param('answerId') id: number,
    @Body() answer: AnswerCreateDto,
    @Request() req,
  ): Promise<AnswerEntity> {
    const { numberOfAffectedRows, updatedAnswer } =
      await this.answerService.update(id, answer, req.user.id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return updatedAnswer;
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
