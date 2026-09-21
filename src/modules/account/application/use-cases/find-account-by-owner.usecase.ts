import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountNotFoundError } from '../../domain/errors/account-not-found.error';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class FindAccountByOwnerUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(owner: UserEntity): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.findByOwner(owner);
    if (!accountEntity) throw new AccountNotFoundError();
    return accountEntity;
  }
}
