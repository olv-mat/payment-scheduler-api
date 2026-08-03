import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserFacade } from '../user.facade';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly facade: UserFacade) {}

  public async execute(id: string): Promise<UserEntity> {
    const entity = await this.facade.findById(id);
    if (!entity) throw new UserNotFoundError();
    return entity;
  }
}
