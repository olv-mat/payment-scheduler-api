import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  public execute(): Promise<UserEntity[]> {
    return this.repository.getAll();
  }
}
