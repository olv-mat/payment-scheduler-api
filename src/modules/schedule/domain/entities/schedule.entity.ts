import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';

export class ScheduleEntity {
  constructor(
    public readonly id: string,
    public readonly payer: AccountEntity,
    public readonly receiver: AccountEntity,
    public readonly value: number,
    public readonly scheduledFor: Date,
    public readonly status: ScheduleStatus,
  ) {}
}
