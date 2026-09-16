import { AccountTypeOrmEntity } from 'src/modules/account/infrastructure/persistence/account.typeorm.entity';
import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('users')
export class UserTypeOrmEntity extends BaseTypeOrmEntity {
  @Column({ length: 100, nullable: false })
  public name!: string;

  @Column({ length: 255, nullable: false, unique: true })
  public email!: string;

  @Column({ length: 255, nullable: false })
  public password!: string;

  @OneToOne(() => AccountTypeOrmEntity, (account) => account.user)
  public account!: AccountTypeOrmEntity;
}
