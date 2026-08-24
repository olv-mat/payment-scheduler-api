import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export type AuthenticationResult = {
  user: UserEntity;
  token: string;
};
