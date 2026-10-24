import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { UpdateAccountBalanceUseCase } from 'src/modules/account/application/use-cases/update-account-balance.usecase';
import { FindScheduleByIdUseCase } from '../../application/use-cases/find-schedule-by-id.usecase';
import { SetScheduleStatusUseCase } from '../../application/use-cases/set-schedule-status.usecase';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { SCHEDULE_QUEUE, ScheduleJob } from './schedule.queue.constants';

@Processor(SCHEDULE_QUEUE, {
  concurrency: Number(process.env.CONCURRENCY ?? 1),
})
export class ScheduleConsumer extends WorkerHost {
  private readonly logger = new Logger(ScheduleConsumer.name);

  constructor(
    private readonly findScheduleByIdUseCase: FindScheduleByIdUseCase,
    private readonly setScheduleStatusUseCase: SetScheduleStatusUseCase,
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
  ) {
    super();
  }

  public async process(job: Job<ScheduleJob>): Promise<void> {
    const scheduleId = job.data.scheduleId;
    const { id, payer, receiver, value } =
      await this.findScheduleByIdUseCase.execute(scheduleId);
    await this.updateAccountBalanceUseCase.execute(payer, { value: -value });
    await this.updateAccountBalanceUseCase.execute(receiver, { value: value });
    await this.setScheduleStatusUseCase.execute(id, ScheduleStatus.FINISHED);
  }
}
