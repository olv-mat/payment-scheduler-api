import { UserResponseMapper } from 'src/modules/user/presentation/mappers/user-response.mapper';
import { AuthenticationResult } from '../../domain/types/authentication-result.type';
import { AuthenticationResponseDto } from '../dtos/authentication-response.dto';

export class AuthenticationResponseMapper {
  public static fromAuthenticationResult(
    authenticationResult: AuthenticationResult,
  ): AuthenticationResponseDto {
    return new AuthenticationResponseDto({
      user: UserResponseMapper.fromEntity(authenticationResult.user),
      token: authenticationResult.token,
    });
  }
}
