import { Injectable } from '@nestjs/common';
import { AccountMapper } from 'src/modules/account/infrastructure/persistence/account.mapper';
import { Mapper } from 'src/shared/infrastructure/persistence/mapper';
import { FindOptionsRelations } from 'typeorm';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleTypeOrmEntity } from './schedule.typeorm.entity';

export const SCHEDULE_RELATIONS: FindOptionsRelations<ScheduleTypeOrmEntity> = {
  payer: { user: true },
  receiver: { user: true },
};

@Injectable()
export class ScheduleMapper implements Mapper<
  ScheduleEntity,
  ScheduleTypeOrmEntity
> {
  constructor(private readonly accountMapper: AccountMapper) {}

  public toDomain(ormEntity: ScheduleTypeOrmEntity): ScheduleEntity {
    return new ScheduleEntity(
      ormEntity.id,
      this.accountMapper.toDomain(ormEntity.payer),
      this.accountMapper.toDomain(ormEntity.receiver),
      ormEntity.value,
      ormEntity.scheduledFor,
      ormEntity.status,
    );
  }
}
