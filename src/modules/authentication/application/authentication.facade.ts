import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CreateUserPayload } from 'src/modules/user/domain/types/create-user-payload.type';
import { Signer } from 'src/shared/domain/cryptography/signer';
import { AccessTokenPayload } from '../domain/contracts/access-token-payload';
import { LoginPayload } from '../domain/types/login-payload.type';
import { LoginUseCase } from './use-cases/login.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';

type AuthenticationResult = {
  sub: UserEntity;
  token: string;
};

@Injectable()
export class AuthenticationFacade {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly signer: Signer,
  ) {}

  public async register(
    payload: CreateUserPayload,
  ): Promise<AuthenticationResult> {
    return this.sign(await this.registerUseCase.execute(payload));
  }

  public async login(payload: LoginPayload): Promise<AuthenticationResult> {
    return this.sign(await this.loginUseCase.execute(payload));
  }

  private async sign(entity: UserEntity): Promise<AuthenticationResult> {
    const token = await this.signer.sign<AccessTokenPayload>({
      sub: entity.id,
      name: entity.name,
      email: entity.email,
    });
    return {
      sub: entity,
      token: token,
    };
  }
}
