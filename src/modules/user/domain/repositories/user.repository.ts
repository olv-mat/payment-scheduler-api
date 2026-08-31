import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../types/create-user-input.type';
import { UpdateUserInput } from '../types/update-user-input.type';

export abstract class UserRepository {
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract create(input: CreateUserInput): Promise<UserEntity>;
  public abstract update(id: string, input: UpdateUserInput): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
