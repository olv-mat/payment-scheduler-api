import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import type { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { CurrentUser } from 'src/shared/presentation/decorators/current-user.decorator';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
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

  @Patch('me/balance')
  @SwaggerOperation('Update the current user account balance')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Insufficient account balance')
  @SwaggerInternalServerError()
  public async updateBalance(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body() dto: ValueDto,
  ): Promise<DefaultResponseDto> {
    await this.updateAccountBalanceUseCase.execute(sub, dto);
    return DefaultResponseDto.create('Account balance updated successfully');
  }
}
