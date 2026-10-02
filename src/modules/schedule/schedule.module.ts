import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { CreateScheduleUseCase } from './application/use-cases/create-schedule.usecase';
import { FindAllSchedulesByAccountUseCase } from './application/use-cases/find-all-schedules-by-account.usecase';
import { ScheduleRepository } from './domain/repositories/schedule.repository';
import { ScheduleMapper } from './infrastructure/persistence/schedule.mapper';
import { ScheduleTypeOrmEntity } from './infrastructure/persistence/schedule.typeorm.entity';
import { ScheduleTypeOrmRepository } from './infrastructure/persistence/schedule.typeorm.repository';
import { ScheduleController } from './presentation/schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleTypeOrmEntity]), AccountModule],
  controllers: [ScheduleController],
  providers: [
    ScheduleMapper,
    CreateScheduleUseCase,
    FindAllSchedulesByAccountUseCase,
    {
      provide: ScheduleRepository,
      useClass: ScheduleTypeOrmRepository,
    },
  ],
})
export class ScheduleModule {}
