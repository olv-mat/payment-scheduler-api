import { Injectable } from '@nestjs/common';
import { FindUserByEmailUseCase } from 'src/modules/user/application/use-cases/find-user-by-email.usecase';
import { CryptographyComparer } from 'src/shared/domain/cryptography/comparer';
import { CryptographySigner } from 'src/shared/domain/cryptography/signer';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { AccessTokenPayload } from '../../domain/types/access-token-payload.type';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';
import { LoginCredentials } from '../../domain/types/login-credentials.type';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly cryptographyComparer: CryptographyComparer,
    private readonly cryptographySigner: CryptographySigner,
  ) {}

  public async execute(
    credentials: LoginCredentials,
  ): Promise<AuthenticationResult> {
    const { email, password } = credentials;
    const userEntity = await this.findUserByEmailUseCase.execute(email);
    if (
      !userEntity ||
      !(await this.cryptographyComparer.compare(password, userEntity.password))
    ) {
      throw new InvalidCredentialsError();
    }
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
