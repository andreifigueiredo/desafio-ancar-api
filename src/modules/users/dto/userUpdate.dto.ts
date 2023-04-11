import { MinLength, IsOptional } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserUpdateDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsCPF()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  readonly cpf: string;
}
