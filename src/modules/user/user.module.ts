import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './infrastructure/persistence/user.typeorm.entity';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
