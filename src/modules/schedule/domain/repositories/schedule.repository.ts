import { ScheduleEntity } from '../entities/schedule.entity';
import { CreateScheduleInput } from '../types/create-schedule-input';

export abstract class ScheduleRepository {
  public abstract findByPayer(payer: string): Promise<ScheduleEntity[]>;
  public abstract create(
    payer: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity>;
}
