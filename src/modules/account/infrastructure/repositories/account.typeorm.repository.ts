import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountTypeOrmEntity } from '../persistence/account.typeorm.entity';

export class AccountTypeOrmRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeOrmEntity)
    private readonly accountRepository: Repository<AccountTypeOrmEntity>,
  ) {}

  public async findById(id: string): Promise<AccountEntity | null> {
    const accountEntity = await this.accountRepository.findOne({
      where: { id: id },
    });
    return accountEntity ? this.toDomain(accountEntity) : null;
  }

  public async findByOwner(owner: UserEntity): Promise<AccountEntity | null> {
    const accountEntity = await this.accountRepository.findOne({
      where: { user: { id: owner.id } },
    });
    return accountEntity ? this.toDomain(accountEntity) : null;
  }

  public async create(owner: UserEntity): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.save({
      user: { id: owner.id },
    });
    return this.toDomain(accountEntity);
  }

  public async setBalance(id: string, balance: number): Promise<void> {
    await this.accountRepository.update(id, { balance });
  }

  private toDomain(accountTypeOrmEntity: AccountTypeOrmEntity): AccountEntity {
    const { id, number, balance, user } = accountTypeOrmEntity;
    return new AccountEntity(id, number, balance, user);
  }
}
