import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { FindAccountByOwnerIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner-id.usecase';
import type { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { CurrentUser } from 'src/shared/presentation/decorators/current-user.decorator';
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
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserWithAccountResponseDto } from './dtos/user-with-account-response.dto';
import { UserResponseMapper } from './mappers/user-response.mapper';
import { UserWithAccountResponseMapper } from './mappers/user-with-account-response.mapper';

@Controller()
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('/me')
  @SwaggerOperation('Retrieve the current user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async find(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<UserWithAccountResponseDto> {
    const userEntity = await this.findUserByIdUseCase.execute(sub);
    return UserWithAccountResponseMapper.fromEntities(
      userEntity,
      await this.findAccountByOwnerIdUseCase.execute(userEntity.id),
    );
  }

  @Patch('/me')
  @SwaggerOperation('Update the current user')
  @SwaggerBadRequest('At least one field must be provided')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerConflict('Email already in use')
  @SwaggerInternalServerError()
  public async update(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body(new AtLeastOneFieldPipe()) dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    await this.updateUserUseCase.execute(sub, dto);
    return DefaultResponseDto.create('User updated successfully');
  }

  @Delete('/me')
  @SwaggerOperation('Delete the current user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerInternalServerError()
  public async delete(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<DefaultResponseDto> {
    await this.deleteUserUseCase.execute(sub);
    return DefaultResponseDto.create('User deleted successfully');
  }

  @Get('users')
  @SwaggerOperation('Retrieve all users')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerInternalServerError()
  public async findAll(): Promise<UserResponseDto[]> {
    return UserResponseMapper.fromEntities(
      await this.findAllUsersUseCase.execute(),
    );
  }

  @Get('users/:id')
  @SwaggerOperation('Retrieve a specific user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async findOne(
    @Param() { id }: IdDto,
  ): Promise<UserWithAccountResponseDto> {
    const userEntity = await this.findUserByIdUseCase.execute(id);
    return UserWithAccountResponseMapper.fromEntities(
      userEntity,
      await this.findAccountByOwnerIdUseCase.execute(userEntity.id),
    );
  }
}
