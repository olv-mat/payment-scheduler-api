import { Injectable } from '@nestjs/common';
import { FindAccountByOwnerUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner.usecase';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

@Injectable()
export class FindSchedulesBySubUseCase {
  constructor(
    private readonly findAccountByOwnerUseCase: FindAccountByOwnerUseCase,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  public async execute(sub: string): Promise<ScheduleEntity[]> {
    const { id } = await this.findAccountByOwnerUseCase.execute(sub);
    return await this.scheduleRepository.findByPayer(id);
  }
}
