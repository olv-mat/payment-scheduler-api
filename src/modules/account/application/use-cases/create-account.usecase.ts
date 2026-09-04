import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { CreateAccountInput } from '../../domain/types/create-account-input.type';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public execute(input: CreateAccountInput): Promise<AccountEntity> {
    return this.accountRepository.create(input);
  }
}
