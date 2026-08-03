import { Controller, Get, Param } from '@nestjs/common';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUseCase: FindAllUsersUseCase,
    private readonly findByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Get()
  @SwaggerOperation('Retrieve all users')
  @SwaggerInternalServerError()
  public async findAll(): Promise<UserResponseDto[]> {
    const entities = await this.findAllUseCase.execute();
    return UserResponseDto.fromEntities(entities);
  }

  @Get(':id')
  public async findOne(@Param() { id }: IdDto) {
    const entity = await this.findByIdUseCase.execute(id);
    return UserResponseDto.fromEntity(entity);
  }
}
