import { Quiz } from './quiz.entity';
import { QUIZ_REPOSITORY } from '../../core/constants';

export const quizzesProviders = [
  {
    provide: QUIZ_REPOSITORY,
    useValue: Quiz,
  },
];
