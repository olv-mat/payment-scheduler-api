import { Injectable } from '@nestjs/common';
import { AccountNotFoundError } from '../../domain/errors/account-not-found.error';
import { InsufficientAccountBalanceError } from '../../domain/errors/insufficient-account-balance.error';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { ValueInput } from '../../domain/types/value-input.type';

@Injectable()
export class UpdateAccountBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(id: string, input: ValueInput): Promise<void> {
    const { value } = input;
    const accountEntity = await this.accountRepository.findById(id);
    if (!accountEntity) throw new AccountNotFoundError();
    const newBalance = accountEntity.balance + value;
    if (newBalance < 0) throw new InsufficientAccountBalanceError();
    await this.accountRepository.setBalance(accountEntity.id, newBalance);
  }
}
