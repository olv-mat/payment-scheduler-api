import { makeUserEntity } from 'src/modules/user/test/factories/user.entity.factory';
import { AccountEntity } from '../../domain/entities/account.entity';

export const makeAccountEntity = (
  override?: Partial<AccountEntity>,
): AccountEntity => ({
  id: '3f2b6c1e-5a7d-4e8b-9c0a-1d2e3f4a5b6c',
  balance: 1000,
  owner: makeUserEntity(),
  ...override,
});
