import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/modules/user/infrastructure/persistence/user.mapper';
import { Mapper } from 'src/shared/infrastructure/persistence/mapper';
import { FindOptionsRelations } from 'typeorm';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountTypeOrmEntity } from './account.typeorm.entity';

export const ACCOUNT_RELATIONS: FindOptionsRelations<AccountTypeOrmEntity> = {
  user: true,
};

@Injectable()
export class AccountMapper implements Mapper<
  AccountEntity,
  AccountTypeOrmEntity
> {
  constructor(private readonly userMapper: UserMapper) {}

  public toDomain(ormEntity: AccountTypeOrmEntity): AccountEntity {
    return new AccountEntity(
      ormEntity.id,
      ormEntity.balance,
      this.userMapper.toDomain(ormEntity.user),
    );
  }
}
