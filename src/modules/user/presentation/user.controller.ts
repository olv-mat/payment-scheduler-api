import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { FindAccountByOwnerUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner.usecase';
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
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserWithAccountResponseDto } from './dtos/user-with-account-response.dto';
import { UserResponseMapper } from './mappers/user-response.mapper';
import { UserWithAccountResponseMapper } from './mappers/user-with-account-response.mapper';

@Controller('users')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findAccountByOwnerUseCase: FindAccountByOwnerUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @SwaggerOperation('Retrieve all users')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerInternalServerError()
  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.findAllUsersUseCase.execute();
    return UserResponseMapper.fromEntities(userEntities);
  }

  @Get(':id')
  @SwaggerOperation('Retrieve a specific user with account')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not found')
  @SwaggerInternalServerError()
  public async findOne(
    @Param() { id }: IdDto,
  ): Promise<UserWithAccountResponseDto> {
    const userEntity = await this.findUserByIdUseCase.execute(id);
    const accountEntity =
      await this.findAccountByOwnerUseCase.execute(userEntity);
    return UserWithAccountResponseMapper.fromEntities(
      userEntity,
      accountEntity,
    );
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
    await this.updateUserUseCase.execute(id, dto);
    return DefaultResponseDto.create('User updated successfully');
  }

  @Delete(':id')
  @SwaggerOperation('Delete a specific user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerInternalServerError()
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    await this.deleteUserUseCase.execute(id);
    return DefaultResponseDto.create('User deleted successfully');
  }
}
