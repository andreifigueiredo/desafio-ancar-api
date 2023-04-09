import { Question } from './question.entity';
import { QUESTION_REPOSITORY } from '../../core/constants';

export const questionProviders = [
  {
    provide: QUESTION_REPOSITORY,
    useValue: Question,
  },
];
