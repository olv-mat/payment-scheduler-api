import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import {
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
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
  @SwaggerOperation('Retrieve a specific user')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async findOne(@Param() { id }: IdDto): Promise<UserResponseDto> {
    try {
      const entity = await this.findByIdUseCase.execute(id);
      return UserResponseDto.fromEntity(entity);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
