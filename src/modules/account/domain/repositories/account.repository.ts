import { AccountEntity } from '../entities/account.entity';

export abstract class AccountRepository {
  public abstract findById(id: string): Promise<AccountEntity | null>;
  public abstract findByOwnerId(ownerId: string): Promise<AccountEntity | null>;
  public abstract create(ownerId: string): Promise<AccountEntity>;
  public abstract updateBalance(id: string, balance: number): Promise<void>;
}
