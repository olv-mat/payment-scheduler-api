import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginPayload } from '../../domain/types/login-payload.type';

export class LoginDto implements LoginPayload {
  @IsEmail()
  @IsNotEmpty()
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
