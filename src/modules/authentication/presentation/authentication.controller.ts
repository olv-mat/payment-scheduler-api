import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/presentation/dtos/create-user.dto';
import { AuthenticationFacade } from '../application/authentication.facade';
import { AuthenticationResponseDto } from './dtos/authentication-response.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly facade: AuthenticationFacade) {}

  @Post('/register')
  public async register(
    @Body() dto: CreateUserDto,
  ): Promise<AuthenticationResponseDto> {
    const { sub, token } = await this.facade.register(dto);
    return AuthenticationResponseDto.fromEntity(sub, token);
  }

  @Post('/login')
  public async login(
    @Body() dto: LoginDto,
  ): Promise<AuthenticationResponseDto> {
    const { sub, token } = await this.facade.login(dto);
    return AuthenticationResponseDto.fromEntity(sub, token);
  }
}
