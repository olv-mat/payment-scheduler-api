import { Injectable } from '@nestjs/common';
import { AccountNotFoundError } from '../../domain/errors/account-not-found.error';
import { InsufficientAccountBalanceError } from '../../domain/errors/insufficient-account-balance.error';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class DecreaseAccountBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(id: string, decreaseValue: number): Promise<void> {
    const accountEntity = await this.accountRepository.findById(id);
    if (!accountEntity) throw new AccountNotFoundError();
    if (decreaseValue > accountEntity.balance) {
      throw new InsufficientAccountBalanceError();
    }
    await this.accountRepository.setBalance(
      accountEntity.id,
      accountEntity.balance - decreaseValue,
    );
  }
}
