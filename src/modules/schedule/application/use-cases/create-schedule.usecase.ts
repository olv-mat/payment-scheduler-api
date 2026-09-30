import { Injectable } from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { ScheduleEntity } from '../../domain/entities/schedule.entity';
import { SameAccountScheduleError } from '../../domain/errors/same-account-schedule.error';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CreateScheduleInput } from '../../domain/types/create-schedule-input';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
  ) {}

  public async execute(input: CreateScheduleInput): Promise<ScheduleEntity> {
    const { payer, receiver } = input;
    if (payer === receiver) throw new SameAccountScheduleError();

    await Promise.all([
      this.findAccountByIdUseCase.execute(payer),
      this.findAccountByIdUseCase.execute(receiver),
    ]);

    return this.scheduleRepository.create(input);
  }
}
