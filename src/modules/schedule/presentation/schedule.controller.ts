import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FindAccountByOwnerIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner-id.usecase';
import type { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { CurrentUser } from 'src/shared/presentation/decorators/current-user.decorator';
import {
  SwaggerBearerAuth,
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
  SwaggerUnauthorized,
  SwaggerUnprocessableEntity,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { CreateScheduleUseCase } from '../application/use-cases/create-schedule.usecase';
import { FindAllSchedulesByAccountIdUseCase } from '../application/use-cases/find-all-schedules-by-account-id.usecase';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('schedules')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class ScheduleController {
  constructor(
    private readonly findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase,
    private readonly findAllSchedulesByAccountIdUseCase: FindAllSchedulesByAccountIdUseCase,
    private readonly createScheduleUseCase: CreateScheduleUseCase,
  ) {}

  @Get('/me')
  @SwaggerOperation('Retrieve the current account schedules')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerInternalServerError()
  public async findAllByAccount(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<ScheduleResponseDto[]> {
    const { id } = await this.findAccountByOwnerIdUseCase.execute(sub);
    const scheduleEntities =
      await this.findAllSchedulesByAccountIdUseCase.execute(id);
    return ScheduleResponseMapper.fromEntities(scheduleEntities);
  }

  @Post()
  @SwaggerOperation('Create a schedule')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerUnprocessableEntity('Payer and receiver must be different accounts')
  @SwaggerInternalServerError()
  public async create(
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const scheduleEntity = await this.createScheduleUseCase.execute(dto);
    return ScheduleResponseMapper.fromEntity(scheduleEntity);
  }
}
