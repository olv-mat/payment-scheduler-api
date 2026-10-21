import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindAccountByIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-id.usecase';
import { FindAccountByUserIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-user-id.usecase';
import type { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { CurrentUser } from 'src/shared/presentation/decorators/current-user.decorator';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import {
  SwaggerBearerAuth,
  SwaggerInternalServerError,
  SwaggerNotFound,
  SwaggerOperation,
  SwaggerUnauthorized,
  SwaggerUnprocessableEntity,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { CreateAndEnqueueScheduleUseCase } from '../application/use-cases/create-and-enqueue-schedule.usecase';
import { DeleteScheduleUseCase } from '../application/use-cases/delete-schedule.usecase';
import { FindSchedulesByAccountIdUseCase } from '../application/use-cases/find-schedules-by-account-id.usecase';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { ScheduleResponseDto } from './dtos/schedule-response.dto';
import { ScheduleResponseMapper } from './mappers/schedule-response.mapper';

@Controller('schedules')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class ScheduleController {
  constructor(
    private readonly findAccountByUserIdUseCase: FindAccountByUserIdUseCase,
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
    private readonly findSchedulesByAccountIdUseCase: FindSchedulesByAccountIdUseCase,
    private readonly createAndEnqueueScheduleUseCase: CreateAndEnqueueScheduleUseCase,
    private readonly deleteScheduleUseCase: DeleteScheduleUseCase,
  ) {}

  @Get('/me')
  @SwaggerOperation('Retrieve the current user schedules')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerInternalServerError()
  public async find(
    @CurrentUser() { sub }: AccessTokenPayload,
  ): Promise<ScheduleResponseDto[]> {
    const { id } = await this.findAccountByUserIdUseCase.execute(sub);
    return ScheduleResponseMapper.fromEntities(
      await this.findSchedulesByAccountIdUseCase.execute(id),
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
    const accountEntities = await Promise.all([
      this.findAccountByUserIdUseCase.execute(sub),
      this.findAccountByIdUseCase.execute(dto.receiver),
    ]);
    return ScheduleResponseMapper.fromEntity(
      await this.createAndEnqueueScheduleUseCase.execute(accountEntities, dto),
    );
  }

  @Delete(':id')
  public async delete(@Param() { id }: IdDto): Promise<DefaultResponseDto> {
    await this.deleteScheduleUseCase.execute(id);
    return DefaultResponseDto.create('Schedule deleted successfully');
  }
}
