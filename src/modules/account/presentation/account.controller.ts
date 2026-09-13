import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/modules/authentication/infrastructure/jwt.guard';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { IdDto } from 'src/shared/presentation/dtos/id.dto';
import { SwaggerBearerAuth } from 'src/shared/presentation/swagger/swagger.decorators';
import { DecreaseAccountBalanceUseCase } from '../application/use-cases/decrease-account-balance.usecase';
import { IncreaseAccountBalanceUseCase } from '../application/use-cases/increase-account-balance.usecase';
import { AccountNotFoundError } from '../domain/errors/account-not-found.error';
import { ValueDto } from './dtos/value.dto';

@Controller('/accounts')
@UseGuards(JwtGuard)
@SwaggerBearerAuth()
export class AccountController {
  constructor(
    private readonly increaseAccountBalanceUseCase: IncreaseAccountBalanceUseCase,
    private readonly decreaseAccountBalanceUseCase: DecreaseAccountBalanceUseCase,
  ) {}

  @Post(':id/increase')
  public async increase(
    @Param() { id }: IdDto,
    @Body() dto: ValueDto,
  ): Promise<DefaultResponseDto> {
    try {
      await this.increaseAccountBalanceUseCase.execute(id, dto);
      return DefaultResponseDto.create(
        'Account balance increased successfully',
      );
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
