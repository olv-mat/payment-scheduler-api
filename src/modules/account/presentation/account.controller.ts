import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
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
import { UpdateAccountBalanceUseCase } from '../application/use-cases/update-account-balance.usecase';
import { ValueDto } from './dtos/value.dto';

@Controller('/accounts')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class AccountController {
  constructor(
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
  ) {}

  @Patch(':id/balance')
  @SwaggerOperation('Update a specific account balance')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Insufficient account balance')
  @SwaggerInternalServerError()
  public async updateBalance(
    @Param() { id }: IdDto,
    @Body() dto: ValueDto,
  ): Promise<DefaultResponseDto> {
    await this.updateAccountBalanceUseCase.execute(id, dto);
    return DefaultResponseDto.create('Account balance updated successfully');
  }
}
