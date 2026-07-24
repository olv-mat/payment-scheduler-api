import { Controller, Get } from '@nestjs/common';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly findAllUseCase: FindAllUsersUseCase) {}

  @Get()
  public async findAll(): Promise<UserResponseDto[]> {
    const entities = await this.findAllUseCase.execute();
    return UserResponseDto.fromEntities(entities);
  }
}
