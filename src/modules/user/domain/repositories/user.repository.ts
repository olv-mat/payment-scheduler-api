import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../types/create-user-payload.type';
import { UpdateUserPayload } from '../types/update-user-payload.type';

export abstract class UserRepository {
  public abstract getAll(): Promise<UserEntity[]>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract create(payload: CreateUserPayload): Promise<void>;
  public abstract update(id: string, payload: UpdateUserPayload): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract emailExists(email: string): Promise<boolean>;
}
