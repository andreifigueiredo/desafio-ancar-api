import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { questionsProviders } from './questions.provider';

@Module({
  providers: [QuestionsService, ...questionsProviders],
  exports: [QuestionsService],
})
export class QuestionsModule {}
