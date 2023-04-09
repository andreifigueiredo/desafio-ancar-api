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
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { QuizzesService } from './quizzes.service';
import { Quiz as QuizEntity } from '../quizzes/quiz.entity';
import { QuizDto } from './dto/quiz.dto';
import { QuizWithQuestionsDto } from './dto/quizWithQuestions.dto';
import { QuestionDto } from '../questions/dto/question.dto';

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
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<QuizEntity> {
    const quiz = await this.quizService.findOne(id);

    if (!quiz) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return quiz;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() QuizWithQuestionsDto,
    @Request() req,
  ): Promise<QuizEntity> {
    const quiz: QuizDto = plainToClass(QuizDto, QuizWithQuestionsDto);
    const questions: QuestionDto[] = QuizWithQuestionsDto.questions.map(
      (question) => plainToClass(QuestionDto, question),
    );
    return await this.quizService.create(quiz, questions, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() quiz: QuizDto,
    @Request() req,
  ): Promise<QuizEntity> {
    const { numberOfAffectedRows, updatedQuiz } = await this.quizService.update(
      id,
      quiz,
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
