import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { SwaggerBearerAuth } from 'src/shared/presentation/swagger/swagger.decorators';
import { DecreaseAccountBalanceUseCase } from '../application/use-cases/decrease-account-balance.usecase';
import { IncreaseAccountBalanceUseCase } from '../application/use-cases/increase-account-balance.usecase';
import { AccountNotFoundError } from '../domain/errors/account-not-found.error';
import { InsufficientAccountBalanceError } from '../domain/errors/insufficient-account-balance.error';
import { ValueDto } from './dtos/value.dto';

@Controller('/accounts')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class AccountController {
  constructor(
    private readonly increaseAccountBalanceUseCase: IncreaseAccountBalanceUseCase,
    private readonly decreaseAccountBalanceUseCase: DecreaseAccountBalanceUseCase,
  ) {}

  @Patch(':id/balance')
  public async updateBalance(
    @Param() { id }: IdDto,
    @Body() dto: ValueDto,
  ): Promise<DefaultResponseDto> {
    try {
      const updateAccountBalanceUseCase =
        dto.value > 0
          ? this.increaseAccountBalanceUseCase
          : this.decreaseAccountBalanceUseCase;
      await updateAccountBalanceUseCase.execute(id, {
        ...dto,
        value: Math.abs(dto.value),
      });
      return DefaultResponseDto.create('Account balance updated successfully');
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof InsufficientAccountBalanceError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw error;
    }
  }
}
