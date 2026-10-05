import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CreateAccountUseCase } from './application/use-cases/create-account.usecase';
import { FindAccountByIdUseCase } from './application/use-cases/find-account-by-id.usecase';
import { FindAccountByOwnerIdUseCase } from './application/use-cases/find-account-by-owner-id.usecase';
import { UpdateAccountBalanceUseCase } from './application/use-cases/update-account-balance.usecase';
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
    FindAccountByIdUseCase,
    FindAccountByOwnerIdUseCase,
    UpdateAccountBalanceUseCase,
    AccountMapper,
    {
      provide: AccountRepository,
      useClass: AccountTypeOrmRepository,
    },
  ],
  exports: [
    CreateAccountUseCase,
    FindAccountByIdUseCase,
    FindAccountByOwnerIdUseCase,
    UpdateAccountBalanceUseCase,
    AccountMapper,
  ],
})
export class AccountModule {}
