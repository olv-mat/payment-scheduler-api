import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/shared/infrastructure/persistence/mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserTypeOrmEntity } from './user.typeorm.entity';

@Injectable()
export class UserMapper extends Mapper<UserEntity, UserTypeOrmEntity> {
  public toDomain(ormEntity: UserTypeOrmEntity): UserEntity {
    return new UserEntity(
      ormEntity.id,
      ormEntity.name,
      ormEntity.email,
      ormEntity.password,
    );
  }
}
