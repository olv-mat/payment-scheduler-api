import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { getQueueToken } from '@nestjs/bullmq';
import { INestApplication } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SCHEDULE_QUEUE } from '../../../modules/schedule/infrastructure/queue/schedule.queue.constants';

export function setupBullBoard(app: INestApplication): void {
  const scheduleQueue = app.get<Queue>(getQueueToken(SCHEDULE_QUEUE));
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  createBullBoard({
    queues: [new BullMQAdapter(scheduleQueue)],
    serverAdapter: serverAdapter,
  });
  app.use('/admin/queues', serverAdapter.getRouter());
}
