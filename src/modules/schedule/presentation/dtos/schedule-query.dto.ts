import { IsEnum, IsOptional } from 'class-validator';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleQueryInput } from '../../domain/types/schedule-query-input';

export class ScheduleQueryDto implements ScheduleQueryInput {
  @IsOptional()
  @IsEnum(ScheduleStatus)
  status?: ScheduleStatus;
}
