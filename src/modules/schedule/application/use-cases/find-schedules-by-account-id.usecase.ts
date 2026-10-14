import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindSchedulesByAccountIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(accountId: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.findByAccountId(accountId);
  }
}
