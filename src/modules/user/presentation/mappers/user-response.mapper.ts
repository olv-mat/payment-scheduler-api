import { UserEntity } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserResponseMapper {
  public static fromEntity(userEntity: UserEntity): UserResponseDto {
    return new UserResponseDto({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
    });
  }

  public static fromEntities(userEntities: UserEntity[]): UserResponseDto[] {
    return userEntities.map((userEntity) =>
      UserResponseMapper.fromEntity(userEntity),
    );
  }
}
