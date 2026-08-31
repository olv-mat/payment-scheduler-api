import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.usecase';
import { CreateUserInput } from 'src/modules/user/domain/types/create-user-input.type';
import { CryptographySigner } from 'src/shared/domain/cryptography/signer';
import { AccessTokenPayload } from '../../domain/types/access-token-payload.type';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly cryptographySigner: CryptographySigner,
  ) {}

  public async execute(input: CreateUserInput): Promise<AuthenticationResult> {
    const userEntity = await this.createUserUseCase.execute(input);
    const token = await this.cryptographySigner.sign<AccessTokenPayload>({
      sub: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
    });
    return {
      user: userEntity,
      token: token,
    };
  }
}
