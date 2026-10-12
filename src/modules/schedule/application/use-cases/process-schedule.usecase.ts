import { Injectable } from '@nestjs/common';
import { UpdateAccountBalanceUseCase } from 'src/modules/account/application/use-cases/update-account-balance.usecase';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class ProcessScheduleUseCase {
  constructor(
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  public async execute(reference: string): Promise<void> {
    const scheduleEntity = await this.scheduleRepository.findById(reference);
    if (!scheduleEntity) throw new ScheduleNotFoundError();
    const { id, payer, receiver, value } = scheduleEntity;
    await this.updateAccountBalanceUseCase.execute(payer, { value: -value });
    await this.updateAccountBalanceUseCase.execute(receiver, { value: value });
    await this.scheduleRepository.updateStatus(id, ScheduleStatus.FINISHED);
  }
}
