import { Injectable } from '@nestjs/common';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class SetScheduleStatusUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(id: string, status: ScheduleStatus): Promise<void> {
    await this.scheduleRepository.setStatus(id, status);
  }
}
