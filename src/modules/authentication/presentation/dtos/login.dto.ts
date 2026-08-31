import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginCredentials } from '../../domain/types/login-credentials.type';

export class LoginDto implements LoginCredentials {
  @IsEmail()
  @IsNotEmpty()
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
