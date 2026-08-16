import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  public async execute(id: string): Promise<UserEntity> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new UserNotFoundError();
    return entity;
  }
}
