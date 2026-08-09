import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { AtLeastOneFieldPipe } from 'src/shared/presentation/pipes/at-least-one-field.pipe';
import {
  SwaggerBadRequest,
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUseCase: FindAllUsersUseCase,
    private readonly findByIdUseCase: FindUserByIdUseCase,
    private readonly updateUseCase: UpdateUserUseCase,
    private readonly deleteUseCase: DeleteUserUseCase,
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

  @Patch(':id')
  @SwaggerOperation('Update a specific user')
  @SwaggerBadRequest('At least one field must be provided')
  @SwaggerNotFound('User not Found')
  public async update(
    @Param() { id }: IdDto,
    @Body(new AtLeastOneFieldPipe()) dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    try {
      await this.updateUseCase.execute(id, dto);
      return DefaultResponseDto.create('User updated successfully');
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    try {
      await this.deleteUseCase.execute(id);
      return DefaultResponseDto.create('User deleted successfully');
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
