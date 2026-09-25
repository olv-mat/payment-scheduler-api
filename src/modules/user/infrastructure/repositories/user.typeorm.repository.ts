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
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    const userEntities = await this.userRepository.find();
    return userEntities.map((userEntity) => this.toDomain(userEntity));
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOne({ where: { id: id } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email: email },
    });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  public async create(input: CreateUserInput): Promise<UserEntity> {
    const userEntity = await this.userRepository.save(input);
    return this.toDomain(userEntity);
  }

  public async update(id: string, input: UpdateUserInput): Promise<void> {
    await this.userRepository.update(id, input);
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private toDomain(userTypeOrmEntity: UserTypeOrmEntity): UserEntity {
    const { id, name, email, password } = userTypeOrmEntity;
    return new UserEntity(id, name, email, password);
  }
}
