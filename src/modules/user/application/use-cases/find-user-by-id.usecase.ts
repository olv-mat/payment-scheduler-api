import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserFacade } from '../user.facade';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly facade: UserFacade) {}

  public async execute(id: string): Promise<UserEntity> {
    const entity = await this.facade.findById(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }
}
