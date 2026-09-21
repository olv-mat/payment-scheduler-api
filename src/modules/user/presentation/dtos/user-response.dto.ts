type UserResponseProperties = {
  id: string;
  name: string;
  email: string;
};

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(properties: UserResponseProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.email = properties.email;
  }
}
