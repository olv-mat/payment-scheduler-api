import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity } from 'typeorm';
import { Roles } from '../../domain/enums/roles.enum';

@Entity('users')
export class UserTypeOrmEntity extends BaseTypeOrmEntity {
  @Column({ length: 100, nullable: false })
  public name!: string;

  @Column({ length: 255, nullable: false, unique: true })
  public email!: string;

  @Column({ length: 255, nullable: false })
  public password!: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  public role!: Roles;
}
