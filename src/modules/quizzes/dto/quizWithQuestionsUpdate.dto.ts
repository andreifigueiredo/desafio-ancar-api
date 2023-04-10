import {
  MinLength,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionCreateDto } from 'src/modules/questions/dto/questionCreate.dto';

export class QuizWithQuestionsUpdateDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionCreateDto)
  questions: QuestionCreateDto[];
}
