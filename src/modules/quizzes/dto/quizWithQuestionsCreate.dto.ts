import {
  IsNotEmpty,
  MinLength,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionCreateDto } from 'src/modules/questions/dto/questionCreate.dto';

export class QuizWithQuestionsCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionCreateDto)
  questions: QuestionCreateDto[];
}
