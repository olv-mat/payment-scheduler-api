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
} from 'src/shared/presentation/swagger/swagger.decorators';
import { UserFacade } from '../application/user.facade';
import { EmailAlreadyInUseError } from '../domain/errors/email-already-in-use.error';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  @SwaggerOperation('Retrieve all users')
  @SwaggerInternalServerError()
  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.userFacade.findAll();
    return UserResponseDto.fromEntities(userEntities);
  }

  @Get(':id')
  @SwaggerOperation('Retrieve a specific user')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async findOne(@Param() { id }: IdDto): Promise<UserResponseDto> {
    try {
      const userEntity = await this.userFacade.findById(id);
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
  @SwaggerNotFound('User not Found')
  @SwaggerConflict('Email already in use')
  @SwaggerInternalServerError()
  public async update(
    @Param() { id }: IdDto,
    @Body(new AtLeastOneFieldPipe()) dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    try {
      await this.userFacade.update(id, dto);
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
  @SwaggerNotFound('User not Found')
  @SwaggerInternalServerError()
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    try {
      await this.userFacade.delete(id);
      return DefaultResponseDto.create('User deleted successfully');
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
