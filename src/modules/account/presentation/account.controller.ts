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
import { FindAccountByOwnerIdUseCase } from '../application/use-cases/find-account-by-owner-id.usecase';
import { UpdateAccountBalanceUseCase } from '../application/use-cases/update-account-balance.usecase';
import { ValueDto } from './dtos/value.dto';

@Controller('/accounts')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class AccountController {
  constructor(
    private readonly findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase,
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
  ) {}

  @Patch('me/balance')
  @SwaggerOperation('Update the current user account balance')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Insufficient account balance')
  @SwaggerInternalServerError()
  public async updateBalance(
    @CurrentUser() user: AccessTokenPayload,
    @Body() dto: ValueDto,
  ): Promise<DefaultResponseDto> {
    const { id } = await this.findAccountByOwnerIdUseCase.execute(user.sub);
    await this.updateAccountBalanceUseCase.execute(id, dto);
    return DefaultResponseDto.create('Account balance updated successfully');
  }
}
