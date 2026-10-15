import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { CreateAndEnqueueScheduleUseCase } from './application/use-cases/create-and-enqueue-schedule.usecase';
import { FindScheduleByIdUseCase } from './application/use-cases/find-schedule-by-id.usecase';
import { FindSchedulesByAccountIdUseCase } from './application/use-cases/find-schedules-by-account-id.usecase';
import { UpdateScheduleStatusUseCase } from './application/use-cases/update-schedule-status.usecase';
import { ScheduleQueue } from './domain/queues/schedule.queue';
import { ScheduleRepository } from './domain/repositories/schedule.repository';
import { ScheduleMapper } from './infrastructure/persistence/schedule.mapper';
import { ScheduleTypeOrmEntity } from './infrastructure/persistence/schedule.typeorm.entity';
import { ScheduleTypeOrmRepository } from './infrastructure/persistence/schedule.typeorm.repository';
import { ScheduleBullMqQueue } from './infrastructure/queue/schedule.bullmq.queue';
import { ScheduleConsumer } from './infrastructure/queue/schedule.consumer';
import { SCHEDULE_QUEUE } from './infrastructure/queue/schedule.queue.constants';
import { ScheduleController } from './presentation/schedule.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleTypeOrmEntity]),
    BullModule.registerQueue({
      name: SCHEDULE_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
    AccountModule,
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleMapper,
    CreateAndEnqueueScheduleUseCase,
    FindScheduleByIdUseCase,
    FindSchedulesByAccountIdUseCase,
    UpdateScheduleStatusUseCase,
    ScheduleConsumer,
    { provide: ScheduleRepository, useClass: ScheduleTypeOrmRepository },
    { provide: ScheduleQueue, useClass: ScheduleBullMqQueue },
  ],
})
export class ScheduleModule {}
