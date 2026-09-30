import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { ScheduleEntity } from '../entities/schedule.entity';
import { CreateScheduleInput } from '../types/create-schedule-input';

export abstract class ScheduleRepository {
  public abstract findByPayer(payer: AccountEntity): Promise<ScheduleEntity[]>;
  public abstract findByReceiver(
    receiver: AccountEntity,
  ): Promise<ScheduleEntity[]>;
  public abstract create(input: CreateScheduleInput): Promise<ScheduleEntity>;
}
