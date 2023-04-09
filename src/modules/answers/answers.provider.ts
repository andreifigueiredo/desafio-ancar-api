import { ANSWER_REPOSITORY } from 'src/core/constants';
import { Answer } from './answer.entity';

export const answersProviders = [
  {
    provide: ANSWER_REPOSITORY,
    useValue: Answer,
  },
];
