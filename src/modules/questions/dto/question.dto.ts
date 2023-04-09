import { IsNotEmpty } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  readonly description: string;
}
