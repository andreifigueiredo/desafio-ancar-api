import { IsNotEmpty } from 'class-validator';

export class AnswerDto {
  @IsNotEmpty()
  readonly description: string;
}
