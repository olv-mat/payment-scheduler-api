import { Controller, Get, Param } from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { FindAllSchedulesByAccountUseCase } from '../application/use-cases/find-all-schedules-by-account.usecase';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
    private readonly findAllSchedulesByAccountUseCase: FindAllSchedulesByAccountUseCase,
  ) {}

  @Get('/account/:id')
  public async findAllByAccount(
    @Param() { id }: IdDto,
  ): Promise<ScheduleResponseDto[]> {
    const accountEntity = await this.findAccountByIdUseCase.execute(id);
    const scheduleEntities =
      await this.findAllSchedulesByAccountUseCase.execute(accountEntity);
    return ScheduleResponseMapper.fromEntities(scheduleEntities);
  }
}
