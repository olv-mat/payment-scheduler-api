import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CreateAccountUseCase } from './application/use-cases/create-account.usecase';
import { DepositUseCase } from './application/use-cases/deposit.usecase';
import { FindAccountByIdUseCase } from './application/use-cases/find-account-by-id.usecase';
import { FindAccountByOwnerIdUseCase } from './application/use-cases/find-account-by-owner-id.usecase';
import { WithdrawUseCase } from './application/use-cases/withdraw.usecase';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountMapper } from './infrastructure/persistence/account.mapper';
import { AccountTypeOrmEntity } from './infrastructure/persistence/account.typeorm.entity';
import { AccountTypeOrmRepository } from './infrastructure/persistence/account.typeorm.repository';
import { AccountController } from './presentation/account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountTypeOrmEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    DepositUseCase,
    FindAccountByIdUseCase,
    FindAccountByOwnerIdUseCase,
    WithdrawUseCase,
    AccountMapper,
    { provide: AccountRepository, useClass: AccountTypeOrmRepository },
  ],
  exports: [
    CreateAccountUseCase,
    DepositUseCase,
    FindAccountByIdUseCase,
    FindAccountByOwnerIdUseCase,
    WithdrawUseCase,
    AccountMapper,
  ],
})
export class AccountModule {}
