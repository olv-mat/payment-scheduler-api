import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserQueryInput } from '../../domain/types/user-query-input.type';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public execute(query: UserQueryInput): Promise<[UserEntity[], number]> {
    return this.userRepository.findAll(query);
  }
}
