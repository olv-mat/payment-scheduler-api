import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationFacade } from './application/authentication.facade';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { AuthenticationController } from './presentation/authentication.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationFacade, RegisterUseCase, LoginUseCase],
})
export class AuthenticationModule {}
