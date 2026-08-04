import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserFacade } from '../user.facade';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly facade: UserFacade) {}

  public execute(email: string): Promise<UserEntity | null> {
    return this.facade.findByEmail(email);
  }
}
