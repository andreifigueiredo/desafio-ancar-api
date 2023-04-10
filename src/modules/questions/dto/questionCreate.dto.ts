import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionCreateDto {
  @ApiProperty()
  @IsOptional()
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;
}
