import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findById(id);
    if (!userEntity) throw new UserNotFoundError();
    return userEntity;
  }
}
