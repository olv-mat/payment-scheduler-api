import { AccountEntity } from '../entities/account.entity';

export abstract class AccountRepository {
  public abstract create(): Promise<AccountEntity>;
  public abstract setBalance(id: string, balance: number): Promise<void>;
}
