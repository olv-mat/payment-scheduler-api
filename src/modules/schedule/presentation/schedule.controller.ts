import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { CreateScheduleUseCase } from '../application/use-cases/create-schedule.usecase';
import { FindAllSchedulesByAccountUseCase } from '../application/use-cases/find-all-schedules-by-account.usecase';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
    private readonly findAllSchedulesByAccountUseCase: FindAllSchedulesByAccountUseCase,
    private readonly createScheduleUseCase: CreateScheduleUseCase,
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

  @Post()
  public async create(
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const scheduleEntity = await this.createScheduleUseCase.execute(dto);
    return ScheduleResponseMapper.fromEntity(scheduleEntity);
  }
}
