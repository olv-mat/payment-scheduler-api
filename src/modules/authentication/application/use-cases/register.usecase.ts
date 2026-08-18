import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.usecase';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CreateUserPayload } from 'src/modules/user/domain/types/create-user-payload.type';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async execute(payload: CreateUserPayload): Promise<UserEntity> {
    return await this.createUserUseCase.execute(payload);
  }
}
