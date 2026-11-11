import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { ScheduleQueryInput } from '../../domain/types/schedule-query-input';

@Injectable()
export class FindSchedulesByPayerIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(
    payerId: string,
    query: ScheduleQueryInput,
  ): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.findByPayerId(payerId, query);
  }
}
