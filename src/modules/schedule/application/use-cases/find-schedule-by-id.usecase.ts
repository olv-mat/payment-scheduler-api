import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindScheduleByIdUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(id: string): Promise<ScheduleEntity> {
    const scheduleEntity = await this.scheduleRepository.findById(id);
    if (!scheduleEntity) throw new ScheduleNotFoundError();
    return scheduleEntity;
  }
}
