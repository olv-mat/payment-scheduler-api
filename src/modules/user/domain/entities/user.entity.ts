import { Roles } from '../enums/roles.enum';

export class UserEntity {
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role: Roles;

  constructor(name: string, email: string, password: string, role: Roles) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
