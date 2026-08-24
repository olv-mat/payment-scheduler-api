import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.usecase';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { UserFacade } from './application/user.facade';
import { UserRepository } from './domain/repositories/user.repository';
import { UserTypeOrmEntity } from './infrastructure/persistence/user.typeorm.entity';
import { UserTypeOrmRepository } from './infrastructure/repositories/user.typeorm.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    UserFacade,
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UserFacade],
})
export class UserModule {}
