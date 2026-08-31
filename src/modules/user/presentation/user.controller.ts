import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { AtLeastOneFieldPipe } from 'src/shared/presentation/pipes/at-least-one-field.pipe';
import {
  SwaggerBadRequest,
  SwaggerBearerAuth,
  SwaggerConflict,
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
  SwaggerUnauthorized,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { EmailAlreadyInUseError } from '../domain/errors/email-already-in-use.error';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @SwaggerOperation('Retrieve all users')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerInternalServerError()
  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.findAllUsersUseCase.execute();
    return UserResponseDto.fromEntities(userEntities);
  }

  @Get(':id')
  @SwaggerOperation('Retrieve a specific user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async findOne(@Param() { id }: IdDto): Promise<UserResponseDto> {
    try {
      const userEntity = await this.findUserByIdUseCase.execute(id);
      return UserResponseDto.fromEntity(userEntity);
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
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerConflict('Email already in use')
  @SwaggerInternalServerError()
  public async update(
    @Param() { id }: IdDto,
    @Body(new AtLeastOneFieldPipe()) dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    try {
      await this.updateUserUseCase.execute(id, dto);
      return DefaultResponseDto.create('User updated successfully');
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof EmailAlreadyInUseError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @SwaggerOperation('Delete a specific user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerInternalServerError()
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    try {
      await this.deleteUserUseCase.execute(id);
      return DefaultResponseDto.create('User deleted successfully');
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
