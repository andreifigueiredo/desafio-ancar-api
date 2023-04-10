import { MinLength, IsOptional } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  readonly cpf: string;

  @ApiProperty()
  @IsOptional()
  readonly admin: boolean;
}
