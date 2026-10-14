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

  public async findByAccountId(accountId: string): Promise<ScheduleEntity[]> {
    const scheduleEntities = await this.scheduleRepository.find({
      where: { payer: { id: accountId } },
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
      where: { id: id },
      relations: SCHEDULE_RELATIONS,
    });
    return this.scheduleMapper.toDomain(scheduleEntity!);
  }

  public async updateStatus(id: string, status: ScheduleStatus): Promise<void> {
    await this.scheduleRepository.update(id, { status: status });
  }
}
