import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindSchedulesByPayerIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(payerId: string): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.findByPayerId(payerId);
  }
}
