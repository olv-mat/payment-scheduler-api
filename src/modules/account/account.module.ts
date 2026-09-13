import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccountUseCase } from './application/use-cases/create-account.usecase';
import { DecreaseAccountBalanceUseCase } from './application/use-cases/decrease-account-balance.usecase';
import { IncreaseAccountBalanceUseCase } from './application/use-cases/increase-account-balance.usecase';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountTypeOrmEntity } from './infrastructure/persistence/account.typeorm.entity';
import { AccountTypeOrmRepository } from './infrastructure/repositories/account.typeorm.repository';
import { AccountController } from './presentation/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeOrmEntity])],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    DecreaseAccountBalanceUseCase,
    IncreaseAccountBalanceUseCase,
    {
      provide: AccountRepository,
      useClass: AccountTypeOrmRepository,
    },
  ],
  exports: [
    CreateAccountUseCase,
    DecreaseAccountBalanceUseCase,
    IncreaseAccountBalanceUseCase,
  ],
})
export class AccountModule {}
