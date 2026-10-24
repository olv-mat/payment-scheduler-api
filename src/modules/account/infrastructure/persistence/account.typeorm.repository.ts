import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRepository } from '../../domain/repositories/account.repository';
import {
  ACCOUNT_RELATIONS,
  AccountMapper,
} from '../persistence/account.mapper';
import { AccountTypeOrmEntity } from '../persistence/account.typeorm.entity';

export class AccountTypeOrmRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeOrmEntity)
    private readonly accountRepository: Repository<AccountTypeOrmEntity>,
    private readonly accountMapper: AccountMapper,
  ) {}

  public async findById(id: string): Promise<AccountEntity | null> {
    const accountEntity = await this.accountRepository.findOne({
      where: { id: id },
      relations: ACCOUNT_RELATIONS,
    });
    return accountEntity ? this.accountMapper.toDomain(accountEntity) : null;
  }

  public async findByOwnerId(ownerId: string): Promise<AccountEntity | null> {
    const accountEntity = await this.accountRepository.findOne({
      where: { owner: { id: ownerId } },
      relations: ACCOUNT_RELATIONS,
    });
    return accountEntity ? this.accountMapper.toDomain(accountEntity) : null;
  }

  public async create(ownerId: string): Promise<AccountEntity> {
    const { id } = await this.accountRepository.save({
      owner: { id: ownerId },
    });
    const accountEntity = await this.accountRepository.findOne({
      where: { id: id },
      relations: ACCOUNT_RELATIONS,
    });
    return this.accountMapper.toDomain(accountEntity!);
  }

  public async updateBalance(id: string, balance: number): Promise<void> {
    await this.accountRepository.update(id, { balance });
  }
}
