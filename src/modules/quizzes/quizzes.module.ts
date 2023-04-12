import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { quizzesProviders } from './quizzes.providers';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [QuestionsModule],
  providers: [QuizzesService, ...quizzesProviders],
  controllers: [QuizzesController],
  exports: [QuizzesService],
})
export class QuizzesModule {}
