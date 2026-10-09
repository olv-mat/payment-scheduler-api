import { Injectable } from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { FindAccountByOwnerUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner.usecase';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { SameAccountScheduleError } from '../../domain/errors/same-account-schedule.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CreateScheduleInput } from '../../domain/types/create-schedule-input';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private readonly findAccountByOwnerUseCase: FindAccountByOwnerUseCase,
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  public async execute(
    sub: string,
    input: CreateScheduleInput,
  ): Promise<ScheduleEntity> {
    const [payer, receiver] = await Promise.all([
      this.findAccountByOwnerUseCase.execute(sub),
      this.findAccountByIdUseCase.execute(input.receiver),
    ]);
    if (payer.id === receiver.id) throw new SameAccountScheduleError();
    return this.scheduleRepository.create(payer.id, input);
  }
}
