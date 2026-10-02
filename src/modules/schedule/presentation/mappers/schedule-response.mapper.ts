import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleResponseDto } from '../dtos/schedule-response.dto';

export class ScheduleResponseMapper {
  public static fromEntity(
    scheduleEntity: ScheduleEntity,
  ): ScheduleResponseDto {
    return new ScheduleResponseDto({
      id: scheduleEntity.id,
      payer: scheduleEntity.payer.id,
      receiver: scheduleEntity.receiver.id,
      value: scheduleEntity.value,
      scheduledFor: scheduleEntity.scheduledFor,
      status: scheduleEntity.status,
    });
  }

  public static fromEntities(
    scheduleEntities: ScheduleEntity[],
  ): ScheduleResponseDto[] {
    return scheduleEntities.map((scheduleEntity) =>
      ScheduleResponseMapper.fromEntity(scheduleEntity),
    );
  }
}
