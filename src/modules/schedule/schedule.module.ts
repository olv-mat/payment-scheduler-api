import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { CreateScheduleUseCase } from './application/use-cases/create-schedule.usecase';
import { FindSchedulesBySubUseCase } from './application/use-cases/find-schedules-by-sub.usecase';
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
    FindSchedulesBySubUseCase,
    {
      provide: ScheduleRepository,
      useClass: ScheduleTypeOrmRepository,
    },
  ],
})
export class ScheduleModule {}
