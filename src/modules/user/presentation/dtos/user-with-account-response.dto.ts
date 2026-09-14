import { AccountEntity } from 'src/modules/account/domain/entities/account.entity';
import { AccountResponseDto } from 'src/modules/account/presentation/dtos/account-response.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserResponseDto } from './user-response.dto';

type UserWithAccountResponseProperties = {
  user: UserResponseDto;
  account: AccountResponseDto;
};

export class UserWithAccountResponseDto {
  public readonly user: UserResponseDto;
  public readonly account: AccountResponseDto;

  private constructor(properties: UserWithAccountResponseProperties) {
    this.user = properties.user;
    this.account = properties.account;
  }

  public static fromEntity(
    userEntity: UserEntity,
    accountEntity: AccountEntity,
  ): UserWithAccountResponseDto {
    return new UserWithAccountResponseDto({
      user: UserResponseDto.fromEntity(userEntity),
      account: AccountResponseDto.fromEntity(accountEntity),
    });
  }
}
