import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';
import { UpdateUserPayload } from '../domain/types/update-user-payload.type';

@Injectable()
export class UserFacade {
  constructor(private readonly repository: UserRepository) {}

  public findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  public findById(id: string): Promise<UserEntity | null> {
    return this.repository.findById(id);
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findByEmail(email);
  }

  public async update(id: string, payload: UpdateUserPayload): Promise<void> {
    return this.repository.update(id, payload);
  }
}
