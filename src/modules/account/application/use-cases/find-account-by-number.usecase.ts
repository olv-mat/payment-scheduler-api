import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountNotFoundError } from '../../domain/errors/account-not-found.error';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class FindAccountByNumberUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(number: number): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.findByNumber(number);
    if (!accountEntity) throw new AccountNotFoundError();
    return accountEntity;
  }
}
