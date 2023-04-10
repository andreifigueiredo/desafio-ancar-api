import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuizCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;
}
