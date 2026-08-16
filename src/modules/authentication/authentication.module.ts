import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './presentation/authentication.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
