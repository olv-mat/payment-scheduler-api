import { Injectable } from '@nestjs/common';
import { UserFacade } from 'src/modules/user/application/user.facade';
import { CreateUserPayload } from 'src/modules/user/domain/types/create-user-payload.type';
import { CryptographySigner } from 'src/shared/domain/cryptography/signer';
import { AccessTokenPayload } from '../../domain/contracts/access-token-payload';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly cryptographySigner: CryptographySigner,
  ) {}

  public async execute(
    payload: CreateUserPayload,
  ): Promise<AuthenticationResult> {
    const userEntity = await this.userFacade.create(payload);
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
