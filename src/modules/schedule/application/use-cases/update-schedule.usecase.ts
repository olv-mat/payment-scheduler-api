import { Injectable } from '@nestjs/common';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { UpdateScheduleInput } from '../../domain/types/update-schedule-input';

@Injectable()
export class UpdateScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(id: string, input: UpdateScheduleInput): Promise<void> {
    const scheduleEntity = await this.scheduleRepository.findById(id);
    if (!scheduleEntity) throw new ScheduleNotFoundError();
    await this.scheduleRepository.update(scheduleEntity.id, input);
  }
}
