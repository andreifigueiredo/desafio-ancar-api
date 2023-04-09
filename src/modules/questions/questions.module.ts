import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { questionProviders } from './questions.provider';

@Module({
  providers: [QuestionsService, ...questionProviders],
})
export class QuestionsModule {}
