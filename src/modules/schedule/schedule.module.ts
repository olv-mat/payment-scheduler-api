import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { ScheduleMapper } from './infrastructure/persistence/schedule.mapper';
import { ScheduleController } from './presentation/schedule.controller';

@Module({
  imports: [AccountModule],
  controllers: [ScheduleController],
  providers: [ScheduleMapper],
})
export class ScheduleModule {}
