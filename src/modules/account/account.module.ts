import { Module } from '@nestjs/common';
import { AccountController } from './presentation/account.controller';
@Module({
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
