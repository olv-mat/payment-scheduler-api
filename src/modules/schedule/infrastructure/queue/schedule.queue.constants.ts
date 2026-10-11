import { ScheduleEntity } from '../../domain/entities/schedule.entity';

export const SCHEDULE_QUEUE = 'schedules';

export type ScheduleJob = {
  scheduleEntity: ScheduleEntity;
};
