import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { AccountResponseMapper } from 'src/modules/account/presentation/mappers/account-response.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserWithAccountResponseDto } from '../dtos/user-with-account-response.dto';
import { UserResponseMapper } from './user-response.mapper';

export class UserWithAccountResponseMapper {
  public static fromEntities(
    userEntity: UserEntity,
    accountEntity: AccountEntity,
  ): UserWithAccountResponseDto {
    return new UserWithAccountResponseDto({
      user: UserResponseMapper.fromEntity(userEntity),
      account: AccountResponseMapper.fromEntity(accountEntity),
    });
  }
}
