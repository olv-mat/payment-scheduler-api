import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { InsufficientAccountBalanceError } from '../../domain/errors/insufficient-account-balance.error';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AmountInput } from '../../domain/types/amount-input.type';

@Injectable()
export class WithdrawUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(
    accountEntity: AccountEntity,
    { amount }: AmountInput,
  ): Promise<void> {
    const updatedBalance = accountEntity.balance - amount;
    if (updatedBalance < 0) throw new InsufficientAccountBalanceError();
    await this.accountRepository.updateBalance(
      accountEntity.id,
      updatedBalance,
    );
  }
}
