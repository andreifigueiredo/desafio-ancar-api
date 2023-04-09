import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { answersProviders } from './answers.provider';
import { AnswersController } from './answers.controller';

@Module({
  providers: [AnswersService, ...answersProviders],
  controllers: [AnswersController],
})
export class AnswersModule {}
