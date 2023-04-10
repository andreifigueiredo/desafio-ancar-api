import { IsNotEmpty } from 'class-validator';

export class AnswerCreateDto {
  @IsNotEmpty()
  readonly description: string;
}
