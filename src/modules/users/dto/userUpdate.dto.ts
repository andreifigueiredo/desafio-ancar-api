import { MinLength, IsOptional } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

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
