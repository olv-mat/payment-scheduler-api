import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class AccountEntity {
  constructor(
    public readonly id: string,
    public readonly number: number,
    public readonly balance: number,
    public readonly owner: UserEntity,
  ) {}
}
