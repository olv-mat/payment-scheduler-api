import { ScheduleStatus } from '../enums/schedule-status.enum';

export type ScheduleQueryInput = {
  status?: ScheduleStatus;
};
