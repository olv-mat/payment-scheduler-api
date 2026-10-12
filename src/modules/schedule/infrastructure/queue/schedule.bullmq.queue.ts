import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ScheduleQueue } from '../../domain/queues/schedule.queue';
import { SCHEDULE_QUEUE, ScheduleJob } from './schedule.queue.constants';

export class ScheduleBullMqQueue implements ScheduleQueue {
  constructor(
    @InjectQueue(SCHEDULE_QUEUE)
    private readonly queue: Queue<ScheduleJob>,
  ) {}

  public async enqueue(reference: string, time: Date): Promise<void> {
    const delay = Math.max(0, time.getTime() - Date.now());
    await this.queue.add(
      'schedule',
      { reference: reference },
      {
        delay: delay,
        jobId: reference,
      },
    );
  }
}
