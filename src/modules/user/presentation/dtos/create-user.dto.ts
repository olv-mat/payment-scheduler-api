import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateUserInput } from '../../domain/types/create-user-input.type';

export class CreateUserDto implements CreateUserInput {
  @IsNotEmpty()
  @IsString()
  public readonly name!: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  public readonly password!: string;
}
