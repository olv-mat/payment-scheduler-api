import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';
import { UserTypeOrmEntity } from '../persistence/user.typeorm.entity';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmRepository>,
  ) {}

  public findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  public findById(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, payload: UpdateUserPayload): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
