import { Injectable } from '@nestjs/common';
import { UserFacade } from 'src/modules/user/application/user.facade';
import { CryptographyComparer } from 'src/shared/domain/cryptography/comparer';
import { CryptographySigner } from 'src/shared/domain/cryptography/signer';
import { AccessTokenPayload } from '../../domain/contracts/access-token-payload';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';
import { LoginPayload } from '../../domain/types/login-payload.type';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly cryptographyComparer: CryptographyComparer,
    private readonly cryptographySigner: CryptographySigner,
  ) {}

  public async execute(payload: LoginPayload): Promise<AuthenticationResult> {
    const { email, password } = payload;
    const userEntity = await this.userFacade.findByEmail(email);
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
