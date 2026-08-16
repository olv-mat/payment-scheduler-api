import { Injectable } from '@nestjs/common';
import { Hasher } from 'src/shared/domain/cryptography/hasher';
import { EmailAlreadyInUseError } from '../../domain/errors/email-already-in-use.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserPayload } from '../../domain/types/create-user-payload.type';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  public async execute(payload: CreateUserPayload): Promise<void> {
    const { email, password } = payload;
    const exists = await this.repository.checkEmailExists(email);
    if (exists) throw new EmailAlreadyInUseError();
    await this.repository.create({
      ...payload,
      password: await this.hasher.hash(password),
    });
  }
}
