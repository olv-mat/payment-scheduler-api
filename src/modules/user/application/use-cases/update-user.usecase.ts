import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';
import { UserFacade } from '../user.facade';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly facade: UserFacade) {}

  public async execute(id: string, payload: UpdateUserPayload): Promise<void> {
    const entity = await this.facade.findById(id);
    if (!entity) throw new UserNotFoundError();
    return this.facade.update(entity.id, payload);
  }
}
