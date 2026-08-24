import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    const userEntity = await this.userRepository.findById(id);
    if (!userEntity) throw new UserNotFoundError();
    return this.userRepository.delete(userEntity.id);
  }
}
