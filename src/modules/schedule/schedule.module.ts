import { Module } from '@nestjs/common';
import { ScheduleController } from './presentation/schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [],
})
export class ScheduleModule {}
