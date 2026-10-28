import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
import { DepositUseCase } from '../application/use-cases/deposit.usecase';
import { FindAccountByOwnerIdUseCase } from '../application/use-cases/find-account-by-owner-id.usecase';
import { WithdrawUseCase } from '../application/use-cases/withdraw.usecase';
import { AmountDto } from './dtos/amount.dto';

@Controller('me/account')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class AccountController {
  constructor(
    private readonly findAccountByOwnerIdUseCase: FindAccountByOwnerIdUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
  ) {}

  @Post('deposits')
  @SwaggerOperation('Deposit an amount into the current user account')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerInternalServerError()
  public async deposit(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body() dto: AmountDto,
  ): Promise<DefaultResponseDto> {
    const accountEntity = await this.findAccountByOwnerIdUseCase.execute(sub);
    await this.depositUseCase.execute(accountEntity, dto);
    return DefaultResponseDto.create('Deposit completed successfully');
  }

  @Post('withdraws')
  @SwaggerOperation('Withdraw an amount from the current user account')
  @SwaggerUnauthorized('Invalid, expired, or missing token')
  @SwaggerNotFound('Account not found')
  @SwaggerUnprocessableEntity('Insufficient account balance')
  @SwaggerInternalServerError()
  public async withdraw(
    @CurrentUser() { sub }: AccessTokenPayload,
    @Body() dto: AmountDto,
  ): Promise<DefaultResponseDto> {
    const accountEntity = await this.findAccountByOwnerIdUseCase.execute(sub);
    await this.withdrawUseCase.execute(accountEntity, dto);
    return DefaultResponseDto.create('Withdrawal completed successfully');
  }
}
