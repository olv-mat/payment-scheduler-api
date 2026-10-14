import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { SameAccountScheduleError } from '../../domain/errors/same-account-schedule.error';
import { ScheduleQueue } from '../../domain/queues/schedule.queue';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CreateScheduleInput } from '../../domain/types/create-schedule-input';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleQueue: ScheduleQueue,
  ) {}

  public async execute(
    accountEntities: [AccountEntity, AccountEntity],
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity> {
    const [payer, receiver] = accountEntities;
    if (payer.id === receiver.id) throw new SameAccountScheduleError();
    const scheduleEntity = await this.scheduleRepository.create(
      payer.id,
      input,
    );
    await this.scheduleQueue.enqueue(
      scheduleEntity.id,
      scheduleEntity.scheduledFor,
    );
    return scheduleEntity;
  }
}
