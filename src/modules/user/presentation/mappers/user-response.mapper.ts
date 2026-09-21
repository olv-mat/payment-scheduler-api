import { UserEntity } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserResponseMapper {
  public static fromEntity(entity: UserEntity): UserResponseDto {
    return new UserResponseDto({
      id: entity.id,
      name: entity.name,
      email: entity.email,
    });
  }

  public static fromEntities(entities: UserEntity[]): UserResponseDto[] {
    return entities.map((entity) => UserResponseMapper.fromEntity(entity));
  }
}
