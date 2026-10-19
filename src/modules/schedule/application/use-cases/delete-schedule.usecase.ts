import { Injectable } from '@nestjs/common';
import { NotSchedulePayerError } from '../../domain/errors/not-schedule-payer.error';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(accountId: string, id: string): Promise<void> {
    const scheduleEntity = await this.scheduleRepository.findById(id);
    if (!scheduleEntity) throw new ScheduleNotFoundError();
    if (scheduleEntity.payer.id !== accountId) {
      throw new NotSchedulePayerError();
    }
    await this.scheduleRepository.delete(scheduleEntity.id);
  }
}
