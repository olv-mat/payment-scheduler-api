import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new UserNotFoundError();
    return this.repository.delete(entity.id);
  }
}
