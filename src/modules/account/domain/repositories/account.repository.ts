import { AccountEntity } from '../entities/account.entity';
import { CreateAccountInput } from '../types/create-account-input.type';

export abstract class AccountRepository {
  public abstract create(input: CreateAccountInput): Promise<AccountEntity>;
}
