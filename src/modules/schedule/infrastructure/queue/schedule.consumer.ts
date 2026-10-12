import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ProcessScheduleUseCase } from '../../application/use-cases/process-schedule.usecase';
import { SCHEDULE_QUEUE, ScheduleJob } from './schedule.queue.constants';

@Processor(SCHEDULE_QUEUE, {
  concurrency: Number(process.env.CONCURRENCY ?? 1),
})
export class ScheduleConsumer extends WorkerHost {
  private readonly logger = new Logger(ScheduleConsumer.name);

  constructor(private readonly processScheduleUseCase: ProcessScheduleUseCase) {
    super();
  }

  public async process(job: Job<ScheduleJob>): Promise<void> {
    const reference = job.data.reference;
    this.logger.log(`Processing schedule ${reference}`);
    await this.processScheduleUseCase.execute(reference);
    this.logger.log(`Processing of schedule ${reference} finished`);
  }
}
