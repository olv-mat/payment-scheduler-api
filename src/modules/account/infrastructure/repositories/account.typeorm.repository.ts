import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountTypeOrmEntity } from '../persistence/account.typeorm.entity';

export class AccountTypeOrmRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeOrmEntity)
    private readonly accountRepository: Repository<AccountTypeOrmEntity>,
  ) {}

  public async create(): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.save({});
    return this.toDomain(accountEntity);
  }

  public async setBalance(id: string, balance: number): Promise<void> {
    await this.accountRepository.update(id, { balance });
  }

  private toDomain(entity: AccountTypeOrmEntity): AccountEntity {
    const { id, number, balance } = entity;
    return new AccountEntity(id, number, balance);
  }
}
