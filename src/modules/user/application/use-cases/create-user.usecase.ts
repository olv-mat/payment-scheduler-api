import { Injectable } from '@nestjs/common';
import { CryptographyHasher } from 'src/shared/domain/cryptography/hasher';
import { UserEntity } from '../../domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../domain/errors/email-already-in-use.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserInput } from '../../domain/types/create-user-input.type';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyHasher: CryptographyHasher,
  ) {}

  public async execute(input: CreateUserInput): Promise<UserEntity> {
    const { email, password } = input;
    const userEntity = await this.userRepository.findByEmail(email);
    if (userEntity) throw new EmailAlreadyInUseError();
    return await this.userRepository.create({
      ...input,
      password: await this.cryptographyHasher.hash(password),
    });
  }
}
