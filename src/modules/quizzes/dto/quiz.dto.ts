import { IsNotEmpty, MinLength } from 'class-validator';

export class QuizDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;
}
