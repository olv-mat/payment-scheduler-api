import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { InsufficientAccountBalanceError } from '../../domain/errors/insufficient-account-balance.error';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { ValueInput } from '../../domain/types/value-input.type';

@Injectable()
export class UpdateAccountBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(
    accountEntity: AccountEntity,
    input: ValueInput,
  ): Promise<void> {
    const updatedBalance = accountEntity.balance + input.value;
    if (updatedBalance < 0) throw new InsufficientAccountBalanceError();
    await this.accountRepository.updateBalance(
      accountEntity.id,
      updatedBalance,
    );
  }
}
