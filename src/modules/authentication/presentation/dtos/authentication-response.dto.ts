import { UserResponseDto } from 'src/modules/user/presentation/dtos/user-response.dto';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';

type AuthenticationResponseProperties = {
  user: UserResponseDto;
  token: string;
};

export class AuthenticationResponseDto {
  public readonly user: UserResponseDto;
  public readonly token: string;

  private constructor(properties: AuthenticationResponseProperties) {
    this.user = properties.user;
    this.token = properties.token;
  }

  public static fromAuthenticationResult(
    result: AuthenticationResult,
  ): AuthenticationResponseDto {
    return new AuthenticationResponseDto({
      user: UserResponseDto.fromEntity(result.user),
      token: result.token,
    });
  }
}
