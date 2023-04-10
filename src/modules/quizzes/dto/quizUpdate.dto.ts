import { IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuizUpdateDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly description: string;
}
