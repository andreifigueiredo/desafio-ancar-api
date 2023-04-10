import { IsNotEmpty, MinLength } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsCPF()
  readonly cpf: string;
}
