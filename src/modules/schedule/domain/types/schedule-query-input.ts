import { PaginationQueryInput } from 'src/shared/domain/types/pagination-query-input.type';
import { ScheduleStatus } from '../enums/schedule-status.enum';

export type ScheduleQueryInput = PaginationQueryInput & {
  status?: ScheduleStatus;
};
