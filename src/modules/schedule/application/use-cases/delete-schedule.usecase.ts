import { Injectable } from '@nestjs/common';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(id: string): Promise<void> {
    const scheduleEntity = await this.scheduleRepository.findById(id);
    if (!scheduleEntity) throw new ScheduleNotFoundError();
    await this.scheduleRepository.delete(scheduleEntity.id);
  }
}
