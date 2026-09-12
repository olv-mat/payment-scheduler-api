import { Injectable } from '@nestjs/common';
import { CreateAccountUseCase } from 'src/modules/account/application/use-cases/create-account.usecase';
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
    private readonly createAccountUseCase: CreateAccountUseCase,
  ) {}

  public async execute(input: CreateUserInput): Promise<UserEntity> {
    const { email, password } = input;
    const existingUserEntity = await this.userRepository.findByEmail(email);
    if (existingUserEntity) throw new EmailAlreadyInUseError();
    const userEntity = await this.userRepository.create({
      ...input,
      password: await this.cryptographyHasher.hash(password),
    });
    await this.createAccountUseCase.execute(userEntity);
    return userEntity;
  }
}
