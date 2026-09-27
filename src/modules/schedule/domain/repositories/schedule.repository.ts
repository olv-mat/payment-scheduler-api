import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { ScheduleEntity } from '../entities/schedule.entity';

export abstract class ScheduleRepository {
  public abstract findByPayer(payer: AccountEntity): Promise<ScheduleEntity[]>;
  public abstract findByReceiver(
    receiver: AccountEntity,
  ): Promise<ScheduleEntity[]>;
}
