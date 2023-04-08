import { IsNotEmpty, MinLength } from 'class-validator';
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
