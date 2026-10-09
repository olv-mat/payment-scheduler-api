import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
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

  public async findByPayer(payer: string): Promise<ScheduleEntity[]> {
    const scheduleEntities = await this.scheduleRepository.find({
      where: { payer: { id: payer } },
      relations: SCHEDULE_RELATIONS,
    });
    return scheduleEntities.map((scheduleEntity) =>
      this.scheduleMapper.toDomain(scheduleEntity),
    );
  }

  public async create(
    payer: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity> {
    const { id } = await this.scheduleRepository.save(
      this.scheduleRepository.create({
        payer: { id: payer },
        receiver: { id: input.receiver },
        value: input.value,
        scheduledFor: input.scheduledFor,
      }),
    );
    const scheduleEntity = await this.scheduleRepository.findOne({
      where: { id },
      relations: SCHEDULE_RELATIONS,
    });
    return this.scheduleMapper.toDomain(scheduleEntity!);
  }
}
