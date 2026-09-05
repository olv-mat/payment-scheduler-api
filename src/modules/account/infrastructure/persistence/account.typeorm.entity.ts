import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class AccountTypeOrmEntity extends BaseTypeOrmEntity {
  @Column({ type: 'int', generated: 'increment', nullable: false })
  public number!: number;

  @Column({ default: 0, nullable: false })
  public balance!: number;
}
