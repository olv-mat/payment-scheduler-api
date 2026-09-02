import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountTypeOrmEntity extends BaseTypeOrmEntity {
  @Column({ nullable: false })
  public number!: number;

  @Column({ nullable: false })
  public balance!: number;
}
