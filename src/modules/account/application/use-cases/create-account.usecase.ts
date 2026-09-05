import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public execute(): Promise<AccountEntity> {
    return this.accountRepository.create();
  }
}
