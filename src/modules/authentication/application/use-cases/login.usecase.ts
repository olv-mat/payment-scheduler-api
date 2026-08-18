import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FindUserByEmailUseCase } from 'src/modules/user/application/use-cases/find-user-by-email.usecase';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Comparer } from 'src/shared/domain/cryptography/comparer';
import { LoginPayload } from '../../domain/types/login-payload.type';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly comparer: Comparer,
  ) {}

  public async execute(payload: LoginPayload): Promise<UserEntity> {
    const { email, password } = payload;
    const entity = await this.findUserByEmailUseCase.execute(email);
    if (!entity || !(await this.comparer.compare(password, entity.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return entity;
  }
}
