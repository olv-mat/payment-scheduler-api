import { AccountResponseDto } from 'src/modules/account/presentation/dtos/account-response.dto';
import { UserResponseDto } from './user-response.dto';

type UserWithAccountResponseProperties = {
  user: UserResponseDto;
  account: AccountResponseDto;
};

export class UserWithAccountResponseDto extends UserResponseDto {
  public readonly account: AccountResponseDto;

  constructor(properties: UserWithAccountResponseProperties) {
    super(properties.user);
    this.account = properties.account;
  }
}
