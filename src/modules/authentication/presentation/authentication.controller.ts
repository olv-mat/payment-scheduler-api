import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailAlreadyInUseError } from 'src/modules/user/domain/errors/email-already-in-use.error';
import { CreateUserDto } from 'src/modules/user/presentation/dtos/create-user.dto';
import {
  SwaggerConflict,
  SwaggerInternalServerError,
  SwaggerOperation,
  SwaggerUnauthorized,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { RegisterUseCase } from '../application/use-cases/register.usecase';
import { InvalidCredentialsError } from '../domain/errors/invalid-credentials.error';
import { AuthenticationResponseDto } from './dtos/authentication-response.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/register')
  @SwaggerOperation('Register user and return the access token')
  @SwaggerConflict('Email already in use')
  @SwaggerInternalServerError()
  public async register(
    @Body() dto: CreateUserDto,
  ): Promise<AuthenticationResponseDto> {
    try {
      const result = await this.registerUseCase.execute(dto);
      return AuthenticationResponseDto.fromAuthenticationResult(result);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Post('/login')
  @SwaggerOperation('Authenticate user and return the access token')
  @SwaggerUnauthorized('Invalid credentials')
  @SwaggerInternalServerError()
  public async login(
    @Body() dto: LoginDto,
  ): Promise<AuthenticationResponseDto> {
    try {
      const result = await this.loginUseCase.execute(dto);
      return AuthenticationResponseDto.fromAuthenticationResult(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }
}
