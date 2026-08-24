import { Injectable } from '@nestjs/common';
import { CryptographyHasher } from 'src/shared/domain/cryptography/hasher';
import { EmailAlreadyInUseError } from '../../domain/errors/email-already-in-use.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyHasher: CryptographyHasher,
  ) {}

  public async execute(id: string, payload: UpdateUserPayload): Promise<void> {
    const { email, password } = payload;
    const userEntity = await this.userRepository.findById(id);
    if (!userEntity) throw new UserNotFoundError();
    if (email && email !== userEntity.email) {
      if (await this.userRepository.findByEmail(email)) {
        throw new EmailAlreadyInUseError();
      }
    }
    await this.userRepository.update(userEntity.id, {
      ...payload,
      ...(password && {
        password: await this.cryptographyHasher.hash(password),
      }),
    });
  }
}
