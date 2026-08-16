import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserPayload } from '../../domain/types/create-user-payload.type';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';
import { UserTypeOrmEntity } from '../persistence/user.typeorm.entity';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
  ) {}
  public async getAll(): Promise<UserEntity[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const entity = await this.repository.findOne({ where: { id: id } });
    return entity ? this.toDomain(entity) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = await this.repository.findOne({ where: { email: email } });
    return entity ? this.toDomain(entity) : null;
  }

  public async create(payload: CreateUserPayload): Promise<void> {
    await this.repository.save(payload);
  }

  public async update(id: string, payload: UpdateUserPayload): Promise<void> {
    await this.repository.update(id, payload);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public checkEmailExists(email: string): Promise<boolean> {
    return this.repository.exists({ where: { email: email } });
  }

  private toDomain(entity: UserTypeOrmEntity): UserEntity {
    const { id, name, email, password, role } = entity;
    return new UserEntity(id, name, email, password, role);
  }
}
