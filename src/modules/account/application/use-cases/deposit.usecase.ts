import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AmountInput } from '../../domain/types/amount-input.type';

@Injectable()
export class DepositUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(
    accountEntity: AccountEntity,
    { amount }: AmountInput,
  ): Promise<void> {
    await this.accountRepository.updateBalance(
      accountEntity.id,
      accountEntity.balance + amount,
    );
  }
}
