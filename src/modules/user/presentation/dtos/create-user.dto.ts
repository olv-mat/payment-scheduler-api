import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateUserPayload } from '../../domain/types/create-user-payload.type';

export class CreateUserDto implements CreateUserPayload {
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
