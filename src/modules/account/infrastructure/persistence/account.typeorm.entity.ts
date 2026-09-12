import { UserTypeOrmEntity } from 'src/modules/user/infrastructure/persistence/user.typeorm.entity';
import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm/browser';

@Entity('accounts')
export class AccountTypeOrmEntity extends BaseTypeOrmEntity {
  @Column({ type: 'int', generated: 'increment', nullable: false })
  public number!: number;

  @Column({ default: 0, nullable: false })
  public balance!: number;

  @OneToOne(() => UserTypeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user!: UserTypeOrmEntity;
}
