import { Injectable } from '@nestjs/common';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class UpdateScheduleStatusUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(id: string, status: ScheduleStatus): Promise<void> {
    await this.scheduleRepository.updateStatus(id, status);
  }
}
