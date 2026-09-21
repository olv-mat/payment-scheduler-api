import { UserResponseDto } from 'src/modules/user/presentation/dtos/user-response.dto';

type AuthenticationResponseProperties = {
  user: UserResponseDto;
  token: string;
};

export class AuthenticationResponseDto {
  public readonly user: UserResponseDto;
  public readonly token: string;

  constructor(properties: AuthenticationResponseProperties) {
    this.user = properties.user;
    this.token = properties.token;
  }
}
