import { UserEntity } from '../../domain/entities/user.entity';
import { Roles } from '../../domain/enums/roles.enum';

type UserResponseProperties = {
  id: string;
  name: string;
  email: string;
  role: Roles;
};

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: Roles;

  private constructor(properties: UserResponseProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.email = properties.email;
    this.role = properties.role;
  }

  public static fromEntities(entities: UserEntity[]): UserResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  public static fromEntity(entity: UserEntity): UserResponseDto {
    return new UserResponseDto({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
    });
  }
}
