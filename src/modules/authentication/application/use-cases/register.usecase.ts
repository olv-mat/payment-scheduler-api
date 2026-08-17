import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.usecase';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CreateUserPayload } from 'src/modules/user/domain/types/create-user-payload.type';
import { Signer } from 'src/shared/domain/cryptography/signer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly signer: Signer,
  ) {}

  public async execute(
    payload: CreateUserPayload,
  ): Promise<[UserEntity, string]> {
    const entity = await this.createUserUseCase.execute(payload);
    const token = await this.signer.sign({
      sub: entity.id,
      name: entity.name,
      email: entity.email,
    });
    return [entity, token];
  }
}
