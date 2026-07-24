import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserFacade } from '../user.facade';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly facade: UserFacade) {}

  public execute(): Promise<UserEntity[]> {
    return this.facade.findAll();
  }
}
