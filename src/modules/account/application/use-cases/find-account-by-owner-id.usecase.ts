import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountNotFoundError } from '../../domain/errors/account-not-found.error';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class FindAccountByOwnerIdUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(ownerId: string): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.findByOwnerId(ownerId);
    if (!accountEntity) throw new AccountNotFoundError();
    return accountEntity;
  }
}
