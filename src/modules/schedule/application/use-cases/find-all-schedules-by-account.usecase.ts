import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindAllSchedulesByAccountUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public async execute(account: AccountEntity): Promise<ScheduleEntity[]> {
    const scheduleEntities = await Promise.all([
      this.scheduleRepository.findByPayer(account),
      this.scheduleRepository.findByReceiver(account),
    ]);
    return scheduleEntities.flat();
  }
}
