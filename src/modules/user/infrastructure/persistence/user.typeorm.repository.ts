import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserInput } from '../../domain/types/create-user-input.type';
import { UpdateUserInput } from '../../domain/types/update-user-input.type';
import { UserQueryInput } from '../../domain/types/user-query-input.type';
import { UserMapper } from '../persistence/user.mapper';
import { UserTypeOrmEntity } from '../persistence/user.typeorm.entity';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  public async findAll(query: UserQueryInput): Promise<[UserEntity[], number]> {
    const { name, offset, limit } = query;
    const [userEntities, total] = await this.userRepository.findAndCount({
      where: { ...(name && { name: ILike(`%${name}%`) }) },
      order: { createdAt: 'DESC', id: 'DESC' },
      skip: offset,
      take: limit,
    });
    return [
      userEntities.map((userEntity) => this.userMapper.toDomain(userEntity)),
      total,
    ];
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOne({ where: { id: id } });
    return userEntity ? this.userMapper.toDomain(userEntity) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email: email },
    });
    return userEntity ? this.userMapper.toDomain(userEntity) : null;
  }

  public async create(input: CreateUserInput): Promise<UserEntity> {
    const userEntity = await this.userRepository.save(input);
    return this.userMapper.toDomain(userEntity);
  }

  public async update(id: string, input: UpdateUserInput): Promise<void> {
    await this.userRepository.update(id, input);
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
