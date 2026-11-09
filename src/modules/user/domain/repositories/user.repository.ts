import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../types/create-user-input.type';
import { UpdateUserInput } from '../types/update-user-input.type';
import { UserQueryInput } from '../types/user-query-input.type';

export abstract class UserRepository {
  public abstract findAll(query: UserQueryInput): Promise<UserEntity[]>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract create(input: CreateUserInput): Promise<UserEntity>;
  public abstract update(id: string, input: UpdateUserInput): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
