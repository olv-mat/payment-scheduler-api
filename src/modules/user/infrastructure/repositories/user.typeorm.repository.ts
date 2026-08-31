import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserInput } from '../../domain/types/create-user-input.type';
import { UpdateUserInput } from '../../domain/types/update-user-input.type';
import { UserTypeOrmEntity } from '../persistence/user.typeorm.entity';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
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

  public async create(input: CreateUserInput): Promise<UserEntity> {
    const entity = await this.repository.save(input);
    return this.toDomain(entity);
  }

  public async update(id: string, input: UpdateUserInput): Promise<void> {
    await this.repository.update(id, input);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(entity: UserTypeOrmEntity): UserEntity {
    const { id, name, email, password } = entity;
    return new UserEntity(id, name, email, password);
  }
}
