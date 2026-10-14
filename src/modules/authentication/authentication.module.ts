import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { AuthenticationController } from './presentation/authentication.controller';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [AuthenticationController],
  providers: [RegisterUseCase, LoginUseCase, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthenticationModule {}
