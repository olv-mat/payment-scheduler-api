import { ScheduleEntity } from '../entities/schedule.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';
import { CreateScheduleInput } from '../types/create-schedule-input';

export abstract class ScheduleRepository {
  public abstract findById(id: string): Promise<ScheduleEntity | null>;
  public abstract findByPayer(payer: string): Promise<ScheduleEntity[]>;
  public abstract create(
    payer: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity>;
  public abstract updateStatus(
    id: string,
    status: ScheduleStatus,
  ): Promise<void>;
}
