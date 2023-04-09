import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { answersProviders } from './answers.provider';

@Module({
  providers: [AnswersService, ...answersProviders],
})
export class AnswersModule {}
