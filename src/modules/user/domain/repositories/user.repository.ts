import { UserEntity } from '../entities/user.entity';
import { UpdateUserPayload } from '../types/update-user-payload.type';

export abstract class UserAbstractRepository {
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findOne(id: string): Promise<UserEntity | null>;
  public abstract update(id: string, payload: UpdateUserPayload): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
