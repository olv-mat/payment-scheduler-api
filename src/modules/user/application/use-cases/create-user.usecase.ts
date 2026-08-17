import { Injectable } from '@nestjs/common';
import { Hasher } from 'src/shared/domain/cryptography/hasher';
import { UserEntity } from '../../domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../domain/errors/email-already-in-use.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserPayload } from '../../domain/types/create-user-payload.type';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  public async execute(payload: CreateUserPayload): Promise<UserEntity> {
    const { email, password } = payload;
    if (await this.repository.checkByEmail(email)) {
      throw new EmailAlreadyInUseError();
    }
    return await this.repository.create({
      ...payload,
      password: await this.hasher.hash(password),
    });
  }
}
