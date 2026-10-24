import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CreateScheduleInput } from '../../domain/types/create-schedule-input';
import { SCHEDULE_RELATIONS, ScheduleMapper } from './schedule.mapper';
import { ScheduleTypeOrmEntity } from './schedule.typeorm.entity';

export class ScheduleTypeOrmRepository implements ScheduleRepository {
  constructor(
    @InjectRepository(ScheduleTypeOrmEntity)
    private readonly scheduleRepository: Repository<ScheduleTypeOrmEntity>,
    private readonly scheduleMapper: ScheduleMapper,
  ) {}

  public async findById(id: string): Promise<ScheduleEntity | null> {
    const scheduleEntity = await this.scheduleRepository.findOne({
      where: { id: id },
      relations: SCHEDULE_RELATIONS,
    });
    return scheduleEntity ? this.scheduleMapper.toDomain(scheduleEntity) : null;
  }

  public async findByPayerId(payerId: string): Promise<ScheduleEntity[]> {
    const scheduleEntities = await this.scheduleRepository.find({
      where: { payer: { id: payerId } },
      relations: SCHEDULE_RELATIONS,
    });
    return scheduleEntities.map((scheduleEntity) =>
      this.scheduleMapper.toDomain(scheduleEntity),
    );
  }

  public async create(
    payerId: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity> {
    const { id } = await this.scheduleRepository.save(
      this.scheduleRepository.create({
        payer: { id: payerId },
        receiver: { id: input.receiver },
        value: input.value,
        scheduledFor: input.scheduledFor,
      }),
    );
    const scheduleEntity = await this.scheduleRepository.findOne({
      where: { id: id },
      relations: SCHEDULE_RELATIONS,
    });
    return this.scheduleMapper.toDomain(scheduleEntity!);
  }

  public async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  public async setStatus(id: string, status: ScheduleStatus): Promise<void> {
    await this.scheduleRepository.update(id, { status: status });
  }
}
