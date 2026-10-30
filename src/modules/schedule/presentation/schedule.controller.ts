import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { FindAccountByOwnerIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner-id.usecase';
import type { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { CurrentUser } from 'src/shared/presentation/decorators/current-user.decorator';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import {
  SwaggerBadRequest,
  SwaggerBearerAuth,
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
  SwaggerUnauthorized,
  SwaggerUnprocessableEntity,
} from 'src/shared/presentation/swagger/swagger.decorators';

import { AtLeastOneFieldPipe } from 'src/shared/presentation/pipes/at-least-one-field.pipe';
import { CreateScheduleUseCase } from '../application/use-cases/create-schedule.usecase';
import { DeleteScheduleUseCase } from '../application/use-cases/delete-schedule.usecase';
import { FindSchedulesByPayerIdUseCase } from '../application/use-cases/find-schedules-by-payer-id.usecase';
import { UpdateScheduleUseCase } from '../application/use-cases/update-schedule.usecase';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { UpdateScheduleDto } from './dtos/update-schedule.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('/me/schedules')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class ScheduleController {
  constructor(
    private readonly findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase,
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
    private readonly findSchedulesByPayerIdUseCase: FindSchedulesByPayerIdUseCase,
    private readonly createScheduleUseCase: CreateScheduleUseCase,
    private readonly updateScheduleUseCase: UpdateScheduleUseCase,
    private readonly deleteScheduleUseCase: DeleteScheduleUseCase,
  ) {}

  @Get()
  @SwaggerOperation('Retrieve the current user’s schedules')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerInternalServerError()
  public async find(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<ScheduleResponseDto[]> {
    const { id } = await this.findAccountByOwnerIdUseCase.execute(sub);
    return ScheduleResponseMapper.fromEntities(
      await this.findSchedulesByPayerIdUseCase.execute(id),
    );
  }

  @Post()
  @SwaggerOperation('Create and enqueue a schedule for the current user')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Payer and receiver must be different accounts')
  @SwaggerInternalServerError()
  public async create(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body() dto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    return ScheduleResponseMapper.fromEntity(
      await this.createScheduleUseCase.execute(
        await Promise.all([
          this.findAccountByOwnerIdUseCase.execute(sub),
          this.findAccountByIdUseCase.execute(dto.receiver),
        ]),
        dto,
      ),
    );
  }

  @Patch(':id')
  @SwaggerOperation('Update one of the current user’s schedules')
  @SwaggerBadRequest('At least one field must be provided')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('User not Found')
  @SwaggerInternalServerError()
  public async update(
    @Param() { id }: IdDto,
    @Body(new AtLeastOneFieldPipe()) dto: UpdateScheduleDto,
  ): Promise<DefaultResponseDto> {
    await this.updateScheduleUseCase.execute(id, dto);
    return DefaultResponseDto.create('Schedule updated successfully');
  }

  @Delete(':id')
  @SwaggerOperation('Delete one of the current user’s schedules')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Schedule not found')
  @SwaggerInternalServerError()
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    await this.deleteScheduleUseCase.execute(id);
    return DefaultResponseDto.create('Schedule deleted successfully');
  }
}
