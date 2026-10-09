import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
import { FindSchedulesBySubUseCase } from '../application/use-cases/find-schedules-by-sub.usecase';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('schedules')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class ScheduleController {
  constructor(
    private readonly findSchedulesBySubUseCase: FindSchedulesBySubUseCase,
    private readonly createScheduleUseCase: CreateScheduleUseCase,
  ) {}

  @Get('/me')
  @SwaggerOperation('Retrieve the current user schedules')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerInternalServerError()
  public async find(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<ScheduleResponseDto[]> {
    return ScheduleResponseMapper.fromEntities(
      await this.findSchedulesBySubUseCase.execute(sub),
    );
  }

  @Post()
  @SwaggerOperation('Create a schedule for the current user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Payer and receiver must be different accounts')
  @SwaggerInternalServerError()
  public async create(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    return ScheduleResponseMapper.fromEntity(
      await this.createScheduleUseCase.execute(sub, dto),
    );
  }
}
