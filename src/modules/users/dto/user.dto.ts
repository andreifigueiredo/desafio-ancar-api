import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsCPF()
  readonly cpf: string;
}

export class UserUpdateDto {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsCPF()
  readonly cpf: string;

  @IsOptional()
  readonly admin: boolean;
}
