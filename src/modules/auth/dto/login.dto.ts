import { IsNotEmpty, MinLength } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsCPF()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  readonly username: string;
}
