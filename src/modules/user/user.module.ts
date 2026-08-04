import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.usecase';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.usecase';
import { UserFacade } from './application/user.facade';
import { UserRepository } from './domain/repositories/user.repository';
import { UserTypeOrmEntity } from './infrastructure/persistence/user.typeorm.entity';
import { UserTypeOrmRepository } from './infrastructure/repositories/user.typeorm.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    UserFacade,
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [FindUserByEmailUseCase],
})
export class UserModule {}
