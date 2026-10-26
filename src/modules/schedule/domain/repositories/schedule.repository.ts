import { ScheduleEntity } from '../entities/schedule.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';
import { CreateScheduleInput } from '../types/create-schedule-input';
import { UpdateScheduleInput } from '../types/update-schedule-input';

export abstract class ScheduleRepository {
  public abstract findById(id: string): Promise<ScheduleEntity | null>;
  public abstract findByPayerId(payerId: string): Promise<ScheduleEntity[]>;
  public abstract create(
    payerId: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity>;
  public abstract setStatus(id: string, status: ScheduleStatus): Promise<void>;
  public abstract update(id: string, input: UpdateScheduleInput): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
