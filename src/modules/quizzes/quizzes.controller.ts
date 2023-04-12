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
import { QuizzesService } from './quizzes.service';
import { Quiz as QuizEntity } from '../quizzes/quiz.entity';
import { QuizWithQuestionsCreateDto } from './dto/quizWithQuestionsCreate.dto';
import { QuizWithQuestionsUpdateDto } from './dto/quizWithQuestionsUpdate.dto';

const doesNotExistMessage = 'Esse Questionário não existe';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.quizService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<QuizEntity> {
    const quiz = await this.quizService.findOne(id);

    if (!quiz) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return quiz;
  }

  @Post()
  async create(
    @Body() quizWithQuestions: QuizWithQuestionsCreateDto,
  ): Promise<QuizEntity> {
    return await this.quizService.create(quizWithQuestions);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() quizWithQuestions: QuizWithQuestionsUpdateDto,
  ): Promise<QuizEntity> {
    const { numberOfAffectedRows, updatedQuiz } = await this.quizService.update(
      id,
      quizWithQuestions,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return updatedQuiz;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.quizService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return 'Successfully deleted';
  }
}
