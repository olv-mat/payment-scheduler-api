import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserPayload } from '../domain/types/create-user-payload.type';
import { UpdateUserPayload } from '../domain/types/update-user-payload.type';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { FindAllUsersUseCase } from './use-cases/find-all-users.usecase';
import { FindUserByEmailUseCase } from './use-cases/find-user-by-email.usecase';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

@Injectable()
export class UserFacade {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  public findAll(): Promise<UserEntity[]> {
    return this.findAllUsersUseCase.execute();
  }

  public findById(id: string): Promise<UserEntity> {
    return this.findUserByIdUseCase.execute(id);
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    return this.findUserByEmailUseCase.execute(email);
  }

  public async create(payload: CreateUserPayload): Promise<UserEntity> {
    return this.createUserUseCase.execute(payload);
  }

  public async update(id: string, payload: UpdateUserPayload): Promise<void> {
    return this.updateUserUseCase.execute(id, payload);
  }

  public delete(id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
