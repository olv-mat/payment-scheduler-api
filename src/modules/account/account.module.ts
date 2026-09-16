import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccountUseCase } from './application/use-cases/create-account.usecase';
import { UpdateAccountBalanceUseCase } from './application/use-cases/update-account-balance.usecase';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountTypeOrmEntity } from './infrastructure/persistence/account.typeorm.entity';
import { AccountTypeOrmRepository } from './infrastructure/repositories/account.typeorm.repository';
import { AccountController } from './presentation/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeOrmEntity])],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    UpdateAccountBalanceUseCase,
    {
      provide: AccountRepository,
      useClass: AccountTypeOrmRepository,
    },
  ],
  exports: [CreateAccountUseCase, UpdateAccountBalanceUseCase],
})
export class AccountModule {}
