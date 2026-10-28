import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DepositUseCase } from 'src/modules/account/application/use-cases/deposit.usecase';
import { WithdrawUseCase } from 'src/modules/account/application/use-cases/withdraw.usecase';
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
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly setScheduleStatusUseCase: SetScheduleStatusUseCase,
  ) {
    super();
  }

  public async process(job: Job<ScheduleJob>): Promise<void> {
    const scheduleId = job.data.scheduleId;
    const { id, payer, receiver, value } =
      await this.findScheduleByIdUseCase.execute(scheduleId);
    await this.withdrawUseCase.execute(payer, { amount: value });
    await this.depositUseCase.execute(receiver, { amount: value });
    await this.setScheduleStatusUseCase.execute(id, ScheduleStatus.FINISHED);
  }
}
