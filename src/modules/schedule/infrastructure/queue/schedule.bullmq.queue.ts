import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ScheduleQueue } from '../../domain/queues/schedule.queue';
import { SCHEDULE_QUEUE, ScheduleJob } from './schedule.queue.constants';

export class ScheduleBullMqQueue implements ScheduleQueue {
  constructor(
    @InjectQueue(SCHEDULE_QUEUE)
    private readonly queue: Queue<ScheduleJob>,
  ) {}

  public async enqueue(scheduleId: string, delay: number): Promise<void> {
    await this.queue.add(
      'schedule',
      { scheduleId: scheduleId },
      {
        delay: delay,
        jobId: scheduleId,
      },
    );
  }
}
