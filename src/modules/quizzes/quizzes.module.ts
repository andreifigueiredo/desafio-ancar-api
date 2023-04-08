import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { quizzesProviders } from './quizzes.providers';

@Module({
  providers: [QuizzesService, ...quizzesProviders],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
