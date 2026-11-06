import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DepositUseCase } from 'src/modules/account/application/use-cases/deposit.usecase';
import { WithdrawUseCase } from 'src/modules/account/application/use-cases/withdraw.usecase';
import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { FindScheduleByIdUseCase } from '../../application/use-cases/find-schedule-by-id.usecase';
import { SetScheduleStatusUseCase } from '../../application/use-cases/set-schedule-status.usecase';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
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
    const { scheduleId } = job.data;
    this.logger.log(`Starting schedule ${scheduleId} processing...`);

    let scheduleEntity: ScheduleEntity;
    try {
      scheduleEntity = await this.findScheduleByIdUseCase.execute(scheduleId);
    } catch (error) {
      this.error(error as Error);
      return;
    }

    const { id, payer, receiver, value } = scheduleEntity;
    try {
      await this.withdraw(payer, value);
      await this.deposit(receiver, value);
      await this.setScheduleStatusUseCase.execute(id, ScheduleStatus.FINISHED);
      this.logger.log(`Schedule ${id} finished successfully`);
    } catch (error) {
      this.error(error as Error);
      await this.setScheduleStatusUseCase.execute(id, ScheduleStatus.FAILED);
    }
  }

  private async withdraw(payer: AccountEntity, value: number): Promise<void> {
    await this.withdrawUseCase.execute(payer, { amount: value });
    this.logger.log(`Took ${value} from payer ${payer.id}`);
  }

  private async deposit(receiver: AccountEntity, value: number): Promise<void> {
    await this.depositUseCase.execute(receiver, { amount: value });
    this.logger.log(`Sent ${value} to receiver ${receiver.id}`);
  }

  private error(error: Error) {
    this.logger.error(error.message);
  }
}
