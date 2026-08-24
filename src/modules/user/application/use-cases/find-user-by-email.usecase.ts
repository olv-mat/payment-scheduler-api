import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public execute(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
