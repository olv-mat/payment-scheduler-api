import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/presentation/dtos/create-user.dto';
import { RegisterUseCase } from '../application/use-cases/register.usecase';
import { AuthenticationResponseDto } from './dtos/authentication-response.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('/register')
  public async register(
    @Body() dto: CreateUserDto,
  ): Promise<AuthenticationResponseDto> {
    const [entity, token] = await this.registerUseCase.execute(dto);
    return AuthenticationResponseDto.fromEntity(entity, token);
  }
}
