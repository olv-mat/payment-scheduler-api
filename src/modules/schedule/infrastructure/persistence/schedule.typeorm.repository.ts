import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
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

  public async findByPayer(payer: AccountEntity): Promise<ScheduleEntity[]> {
    const scheduleEntities = await this.scheduleRepository.find({
      where: { payer: { id: payer.id } },
      relations: SCHEDULE_RELATIONS,
    });
    return scheduleEntities.map((scheduleEntity) =>
      this.scheduleMapper.toDomain(scheduleEntity),
    );
  }

  public async findByReceiver(
    receiver: AccountEntity,
  ): Promise<ScheduleEntity[]> {
    const scheduleEntities = await this.scheduleRepository.find({
      where: { receiver: { id: receiver.id } },
      relations: SCHEDULE_RELATIONS,
    });
    return scheduleEntities.map((scheduleEntity) =>
      this.scheduleMapper.toDomain(scheduleEntity),
    );
  }

  public async create(input: CreateScheduleInput): Promise<ScheduleEntity> {
    const created = await this.scheduleRepository.save(
      this.scheduleRepository.create({
        payer: { id: input.payer },
        receiver: { id: input.receiver },
        value: input.value,
        scheduledFor: input.scheduledFor,
      }),
    );
    const scheduleEntity = await this.scheduleRepository.findOne({
      where: { id: created.id },
      relations: SCHEDULE_RELATIONS,
    });
    return this.scheduleMapper.toDomain(scheduleEntity!);
  }
}
