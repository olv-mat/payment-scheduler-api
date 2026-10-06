import { ScheduleEntity } from '../entities/schedule.entity';
import { CreateScheduleInput } from '../types/create-schedule-input';

export abstract class ScheduleRepository {
  public abstract findByPayerId(payerId: string): Promise<ScheduleEntity[]>;
  public abstract findByReceiverId(
    receiverId: string,
  ): Promise<ScheduleEntity[]>;
  public abstract create(input: CreateScheduleInput): Promise<ScheduleEntity>;
}
