import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindAllSchedulesByAccountIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(accountId: string): Promise<ScheduleEntity[]> {
    const scheduleEntities = await Promise.all([
      this.scheduleRepository.findByPayerId(accountId),
      this.scheduleRepository.findByReceiverId(accountId),
    ]);
    return scheduleEntities.flat();
  }
}
