import { Injectable } from '@nestjs/common';
import { Hasher } from 'src/shared/domain/cryptography/hasher';
import { EmailAlreadyInUseError } from '../../domain/errors/email-already-in-use.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  public async execute(id: string, payload: UpdateUserPayload): Promise<void> {
    const { email, password } = payload;
    const entity = await this.repository.findById(id);
    if (!entity) throw new UserNotFoundError();
    if (email && email !== entity.email) {
      const exists = await this.repository.checkEmailExists(email);
      if (exists) throw new EmailAlreadyInUseError();
    }
    await this.repository.update(entity.id, {
      ...payload,
      ...(password && { password: await this.hasher.hash(password) }),
    });
  }
}
