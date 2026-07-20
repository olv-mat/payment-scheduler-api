import { UserEntity } from '../entities/user.entity';
import { UpdateUserPayload } from '../types/update-user-payload.type';

export abstract class UserRepository {
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract update(
    id: string,
    payload: UpdateUserPayload,
  ): Promise<UserEntity>;
  public abstract delete(id: string): Promise<void>;
}
