import { IsNotEmpty, IsOptional } from 'class-validator';
import internal from 'stream';

export class QuestionDto {
  @IsOptional()
  readonly id: number;

  @IsNotEmpty()
  readonly description: string;
}
