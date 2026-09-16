import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { AccountEntity } from '../entities/account.entity';

export abstract class AccountRepository {
  public abstract findById(id: string): Promise<AccountEntity | null>;
  public abstract findByNumber(number: number): Promise<AccountEntity | null>;
  public abstract create(owner: UserEntity): Promise<AccountEntity>;
  public abstract setBalance(id: string, balance: number): Promise<void>;
}
