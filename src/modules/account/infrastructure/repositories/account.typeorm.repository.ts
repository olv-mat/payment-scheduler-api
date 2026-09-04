import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { CreateAccountInput } from '../../domain/types/create-account-input.type';
import { AccountTypeOrmEntity } from '../persistence/account.typeorm.entity';

export class AccountTypeOrmRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeOrmEntity)
    private readonly accountRepository: Repository<AccountTypeOrmEntity>,
  ) {}

  public async create(input: CreateAccountInput): Promise<AccountEntity> {
    const accountEntity = await this.accountRepository.save(input);
    return this.toDomain(accountEntity);
  }

  private toDomain(entity: AccountTypeOrmEntity): AccountEntity {
    const { id, number, balance } = entity;
    return new AccountEntity(id, number, balance);
  }
}
