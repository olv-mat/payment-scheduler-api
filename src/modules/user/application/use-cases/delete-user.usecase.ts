import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserFacade } from '../user.facade';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly facade: UserFacade) {}

  public async execute(id: string): Promise<void> {
    const entity = await this.facade.findById(id);
    if (!entity) throw new UserNotFoundError();
    return this.facade.delete(entity.id);
  }
}
