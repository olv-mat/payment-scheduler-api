import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/presentation/dtos/create-user.dto';
import {
  SwaggerConflict,
  SwaggerInternalServerError,
  SwaggerOperation,
  SwaggerUnauthorized,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { RegisterUseCase } from '../application/use-cases/register.usecase';
import { AuthenticationResponseDto } from './dtos/authentication-response.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthenticationResponseMapper } from './mappers/authentication-response.mapper';

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
    const result = await this.registerUseCase.execute(dto);
    return AuthenticationResponseMapper.fromAuthenticationResult(result);
  }

  @Post('/login')
  @SwaggerOperation('Authenticate user and return the access token')
  @SwaggerUnauthorized('Invalid credentials')
  @SwaggerInternalServerError()
  public async login(
    @Body() dto: LoginDto,
  ): Promise<AuthenticationResponseDto> {
    const result = await this.loginUseCase.execute(dto);
    return AuthenticationResponseMapper.fromAuthenticationResult(result);
  }
}
