import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/presentation/dtos/pagination-query.dto';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleQueryInput } from '../../domain/types/schedule-query-input';

export class ScheduleQueryDto
  extends PaginationQueryDto
  implements ScheduleQueryInput
{
  @IsOptional()
  @IsEnum(ScheduleStatus)
  status?: ScheduleStatus;
}
