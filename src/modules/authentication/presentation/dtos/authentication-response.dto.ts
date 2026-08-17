import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { UserResponseDto } from 'src/modules/user/presentation/dtos/user-response.dto';

export class AuthenticationResponseDto {
  public readonly user: UserResponseDto;
  public readonly token: string;

  private constructor(user: UserResponseDto, token: string) {
    this.user = user;
    this.token = token;
  }

  public static fromEntity(
    entity: UserEntity,
    token: string,
  ): AuthenticationResponseDto {
    const dto = UserResponseDto.fromEntity(entity);
    return new AuthenticationResponseDto(dto, token);
  }
}
