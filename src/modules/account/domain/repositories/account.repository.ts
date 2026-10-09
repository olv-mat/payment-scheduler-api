import { AccountEntity } from '../entities/account.entity';

export abstract class AccountRepository {
  public abstract findById(id: string): Promise<AccountEntity | null>;
  public abstract findByOwner(owner: string): Promise<AccountEntity | null>;
  public abstract create(owner: string): Promise<AccountEntity>;
  public abstract setBalance(id: string, balance: number): Promise<void>;
}
