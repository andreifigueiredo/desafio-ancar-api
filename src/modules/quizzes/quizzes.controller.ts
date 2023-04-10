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
import { QuizzesService } from './quizzes.service';
import { Quiz as QuizEntity } from '../quizzes/quiz.entity';
import { QuizDto } from './dto/quiz.dto';
import { QuizWithQuestionsDto } from './dto/quizWithQuestions.dto';

const doesNotExistMessage = "This Quiz doesn't exist";

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() quizWithQuestionsDto: QuizWithQuestionsDto,
    @Request() req,
  ): Promise<QuizEntity> {
    return await this.quizService.create(quizWithQuestionsDto, req.user.id);
  }

  // todo: fix these code
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() quizWithQuestionsDto: QuizWithQuestionsDto,
    @Request() req,
  ): Promise<QuizEntity> {
    const { numberOfAffectedRows, updatedQuiz } = await this.quizService.update(
      id,
      quizWithQuestionsDto,
      req.user.id,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return updatedQuiz;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.quizService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return 'Successfully deleted';
  }
}
