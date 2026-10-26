import { OmitType, PartialType } from '@nestjs/swagger';
import { UpdateScheduleInput } from '../../domain/types/update-schedule-input';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto
  extends PartialType(OmitType(CreateScheduleDto, ['receiver'] as const))
  implements UpdateScheduleInput {}
