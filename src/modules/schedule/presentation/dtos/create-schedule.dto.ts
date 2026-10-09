import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, IsUUID, MinDate } from 'class-validator';
import { CreateScheduleInput } from '../../domain/types/create-schedule-input';

export class CreateScheduleDto implements CreateScheduleInput {
  @IsUUID()
  public readonly receiver!: string;

  @IsInt()
  @IsPositive()
  public readonly value!: number;

  @IsDate()
  @MinDate(() => new Date(), { message: 'scheduledFor must be a future date' })
  @Type(() => Date)
  public readonly scheduledFor!: Date;
}
